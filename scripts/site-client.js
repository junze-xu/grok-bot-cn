const START_MD = __START_MD__;
const I18N = __I18N__;
    const LANGS = __LANGS__;
    let lang = localStorage.getItem("gbt-lang") || "zh";

    function t(key) {
      var v = (I18N[lang] && I18N[lang][key]) || (I18N.zh && I18N.zh[key]) || key;
      return v;
    }

    function setLang(l) {
      lang = l;
      localStorage.setItem("gbt-lang", l);
      document.querySelectorAll("[data-i18n]").forEach(function (el) {
        var k = el.getAttribute("data-i18n");
        el.textContent = t(k);
      });
      document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
        var k = el.getAttribute("data-i18n-placeholder");
        el.setAttribute("placeholder", t(k));
      });
      document.querySelectorAll("#lang button").forEach(function (b) {
        b.classList.toggle("on", b.getAttribute("data-lang") === l);
      });
      document.documentElement.lang = l === "zh" ? "zh-CN" : l;
      if (I18N[l] && I18N[l]["title"]) document.title = I18N[l]["title"];
    }

    var langBox = document.getElementById("lang");
    if (langBox) {
      langBox.addEventListener("click", function (e) {
        var b = e.target.closest("button");
        if (b) setLang(b.getAttribute("data-lang"));
      });
      setLang(lang);
    }

    // ---------- 视图路由：#start / #catalog / #packs / #trending / #submit ----------
    var VIEWS = ['start', 'catalog', 'packs', 'trending', 'submit'];
    var VIEW_ALIAS = { 'install': 'start', 'start-here': 'start', 'one-bot': 'start' };
    var currentView = 'start';

    function routeFromHash() {
      var raw = (location.hash || '').replace(/^#/, '');
      if (!raw) return { view: 'start', target: null };
      if (raw.indexOf('bot-') === 0) return { view: 'catalog', target: raw };
      if (raw.indexOf('pack-') === 0) return { view: 'packs', target: raw };
      if (VIEW_ALIAS[raw]) return { view: VIEW_ALIAS[raw], target: document.getElementById(raw) ? raw : null };
      if (VIEWS.indexOf(raw) !== -1) return { view: raw, target: null };
      return { view: currentView, target: null };
    }

    function goView(name) {
      if (VIEWS.indexOf(name) === -1) return;
      if (location.hash === '#' + name) applyView(true);
      else location.hash = name;
    }

    function goCatalog() {
      goView('catalog');
    }

    function applyView(force) {
      var r = routeFromHash();
      var prev = currentView;
      var next = VIEWS.indexOf(r.view) !== -1 ? r.view : 'start';
      var changed = next !== prev;
      currentView = next;
      document.documentElement.setAttribute('data-view', next);
      document.querySelectorAll('.nav-links a[data-view-link]').forEach(function (a) {
        a.classList.toggle('on', a.getAttribute('data-view-link') === next);
      });
      if (!changed && !force) return;
      if (r.target) {
        requestAnimationFrame(function () {
          var el = document.getElementById(r.target);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      if (next === 'trending' && changed) refreshCounts();
    }

    document.querySelectorAll('.nav-links a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        goView(a.getAttribute('href').replace(/^#/, ''));
      });
    });
    window.addEventListener('hashchange', function () { applyView(false); });

    const q = document.getElementById('q');
    const chips = document.getElementById('chips');
    const plugChips = document.getElementById('plugins');
    const countEl = document.getElementById('count');
    const emptyEl = document.getElementById('empty');
    const toastEl = document.getElementById('toast');
    const featuredSec = document.getElementById('start-here');
    const jobs = document.getElementById('jobs');
    const usp = new URLSearchParams(location.search);
    let cat = usp.get('cat') || '';
    let plugin = usp.get('plugin') || '';
    let profiles = null;
    if (usp.get('q')) q.value = usp.get('q');

    function markChips(root, attr, value) {
      root.querySelectorAll('button').forEach(function (x) {
        var on = (x.getAttribute(attr) || '') === value;
        x.classList.toggle('on', on);
      });
    }
    markChips(chips, 'data-cat', cat);
    markChips(plugChips, 'data-plugin', plugin);

    function syncUrl() {
      var p = new URLSearchParams();
      if (cat) p.set('cat', cat);
      if (plugin) p.set('plugin', plugin);
      if (q.value) p.set('q', q.value);
      var qs = p.toString();
      history.replaceState(null, '', (qs ? '?' + qs : location.pathname) + location.hash);
    }

    function apply() {
      var needle = (q.value || '').toLowerCase().trim();
      var n = 0, shown = 0;
      document.querySelectorAll('#grid .card').forEach(function (el) {
        n += 1;
        var okCat = !cat || el.dataset.cat === cat;
        var plugs = (el.dataset.plugins || '').toLowerCase();
        var okPlug = !plugin || plugs.split(',').map(function (s) { return s.trim(); }).indexOf(plugin.toLowerCase()) !== -1;
        var okQ = !needle || (el.dataset.q || '').indexOf(needle) !== -1;
        var vis = okCat && okPlug && okQ;
        el.classList.toggle('hidden', !vis);
        if (vis) shown += 1;
      });
      document.querySelectorAll('#featured .card').forEach(function (el) {
        var okCat = !cat || el.dataset.cat === cat;
        var plugs = (el.dataset.plugins || '').toLowerCase();
        var okPlug = !plugin || plugs.split(',').map(function (s) { return s.trim(); }).indexOf(plugin.toLowerCase()) !== -1;
        var okQ = !needle || (el.dataset.q || '').indexOf(needle) !== -1;
        el.classList.toggle('hidden', !(okCat && okPlug && okQ));
      });
      var featVisible = featuredSec.querySelectorAll('#featured .card:not(.hidden)').length;
      featuredSec.classList.toggle('hidden', featVisible === 0);
      countEl.textContent = t('catalog.showing') + ' ' + shown + ' / ' + n;
      emptyEl.classList.toggle('show', shown === 0);
      syncUrl();
    }

    function toast(msg) {
      toastEl.textContent = msg;
      toastEl.classList.add('on');
      clearTimeout(toast.t);
      toast.t = setTimeout(function () { toastEl.classList.remove('on'); }, 1800);
    }

    async function loadProfiles() {
      if (profiles) return profiles;
      var r = await fetch('profiles.json');
      if (!r.ok) throw new Error('profiles');
      profiles = await r.json();
      return profiles;
    }

    async function copyText(text) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (e) {
        window.prompt('复制', text);
        return true;
      }
    }

    q.addEventListener('input', apply);
    chips.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      cat = b.getAttribute('data-cat') || '';
      markChips(chips, 'data-cat', cat);
      apply();
    });
    plugChips.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      plugin = b.getAttribute('data-plugin') || '';
      markChips(plugChips, 'data-plugin', plugin);
      apply();
    });
    jobs.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      q.value = b.getAttribute('data-q') || '';
      cat = '';
      plugin = '';
      markChips(chips, 'data-cat', '');
      markChips(plugChips, 'data-plugin', '');
      apply();
      goCatalog();
    });
    document.addEventListener('click', async function (e) {
      var btn = e.target.closest('button.copy');
      if (!btn) return;
      var prev = btn.textContent;
      if (btn.hasAttribute('data-crew')) {
        var card = btn.closest('.pack-card');
        var teamName = btn.getAttribute('data-team-name') || '';
        var checked = card ? card.querySelectorAll('input[data-member]:checked') : [];
        var members = [];
        checked.forEach(function (c) {
          members.push({ id: c.getAttribute('data-member'), name: c.getAttribute('data-name') || c.getAttribute('data-member') });
        });
        if (!members.length) {
          toast(t('toast.crew_empty'));
          return;
        }
        var crewLines = [t('crew.prefix').replace('{n}', members.length).replace('{team}', teamName)];
        members.forEach(function (m) { crewLines.push('- ' + m.name + '（' + m.id + '）'); });
        crewLines.push('', t('crew.suffix'));
        try {
          await copyText(crewLines.join('\\n'));
          btn.textContent = t('toast.crew_copied');
          toast(t('toast.crew_copied'));
        } catch (err) {
          toast(t('toast.copy_failed'));
        }
        if (btn.getAttribute('data-count-id')) postCount(btn.getAttribute('data-count-id'), 'team');
        setTimeout(function () { btn.textContent = prev; }, 1400);
        return;
      }
      if (btn.hasAttribute('data-start')) {
        try {
          await copyText(START_MD);
          btn.textContent = t('toast.start_copied');
          toast(t('toast.start_copied'));
        } catch (err) {
          toast(t('toast.copy_failed'));
        }
        if (btn.getAttribute('data-count-id')) postCount(btn.getAttribute('data-count-id'), btn.getAttribute('data-count-kind') || 'team');
        setTimeout(function () { btn.textContent = prev; }, 1400);
        return;
      }
      var id = btn.getAttribute('data-profile');
      var countId = btn.getAttribute('data-count-id');
      var countKind = btn.getAttribute('data-count-kind') || 'bot';
      try {
        if (id) {
          var map = await loadProfiles();
          var body = map[id];
          if (!body) throw new Error('missing');
          await copyText(body);
          btn.textContent = t('toast.profile_copied');
          toast(t('toast.profile_copied'));
        } else {
          var text = btn.getAttribute('data-copy') || '';
          await copyText(text);
          btn.textContent = t('toast.copied');
          toast(t('toast.copied_to_clipboard'));
        }
      } catch (err) {
        var fallback = btn.getAttribute('data-copy') || '';
        if (fallback) {
          await copyText(fallback);
          toast(t('toast.copied_link'));
        } else {
          toast(t('toast.copy_failed'));
        }
      }
      if (countId) postCount(countId, countKind);
      setTimeout(function () { btn.textContent = prev; }, 1400);
    });
    document.addEventListener('keydown', function (e) {
      var tag = (e.target && e.target.tagName) || '';
      if (e.key === '/' && tag !== 'INPUT' && tag !== 'TEXTAREA' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        if (currentView !== 'catalog') goView('catalog');
        q.focus();
        q.select();
      }
      if (e.key === 'Escape' && q.value) {
        q.value = '';
        apply();
      }
    });
    apply();

    // ---------- 分类磁贴：点击 -> 目录筛选 ----------
    document.querySelectorAll('.cat-tile').forEach(function (b) {
      b.addEventListener('click', function () {
        cat = b.getAttribute('data-cat') || '';
        markChips(chips, 'data-cat', cat);
        apply();
        goCatalog();
      });
    });

    // ---------- 复制计数 / 热门榜（未配置 COUNTS_API 时静默跳过） ----------
    var COUNTS_API = __COUNTS_API__;
    var GH = __GH__;
    var BOTS = __BOTS__;
    var TEAMS = __TEAMS__;

    function escH(s) {
      return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
      });
    }

    function countBadge(id, kind) {
      var list = document.querySelectorAll('[data-count-for="' + id + '"]');
      for (var i = 0; i < list.length; i++) {
        if ((list[i].getAttribute('data-kind') || 'bot') === kind) return list[i];
      }
      return null;
    }

    function setCount(id, kind, n) {
      var el = countBadge(id, kind);
      if (el) {
        var span = el.querySelector('.n');
        if (span) span.textContent = n; else el.textContent = n;
        el.title = n;
      }
      if (kind === 'team') {
        document.querySelectorAll('[data-team-counts="' + id + '"]').forEach(function (x) {
          x.textContent = n + ' ' + t('card.copies');
        });
      }
    }

    function postCount(id, kind) {
      if (!COUNTS_API) return Promise.resolve(null);
      return fetch(COUNTS_API + '/api/v1/count', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id, kind: kind || 'bot' })
      }).then(function (r) { return r.json(); }).then(function (data) {
        if (data && data.ok && typeof data.count === 'number') setCount(id, kind, data.count);
        return data;
      }).catch(function () { return null; });
    }

    function renderRank(botCounts) {
      var box = document.getElementById('rank');
      if (!box) return;
      var items = [];
      BOTS.forEach(function (b) {
        var n = botCounts[b.id] || 0;
        if (n > 0) items.push({ id: b.id, name: b.name, category: b.category, count: n });
      });
      items.sort(function (a, b) { return b.count - a.count; });
      items = items.slice(0, 12);
      if (!items.length) {
        box.innerHTML = '<p class="rank-empty">' + escH(t('trending.empty')) + '</p>';
        return;
      }
      box.innerHTML = items.map(function (it, i) {
        return '<a class="rank-row' + (i < 3 ? ' top' : '') + '" href="#bot-' + escH(it.id) + '">' +
          '<span class="rank-no">' + (i + 1) + '</span>' +
          '<span class="rank-name">' + escH(it.name) + '</span>' +
          '<span class="cat chip">' + escH(it.category) + '</span>' +
          '<span class="rank-n">' + it.count + '</span></a>';
      }).join('');
    }

    function renderTeamRank(teamCounts) {
      var box = document.getElementById('rank-teams');
      if (!box) return;
      var items = TEAMS.map(function (tm) {
        return { id: tm.id, name: tm.name, kind: tm.kind, count: teamCounts[tm.id] || 0 };
      }).filter(function (x) { return x.count > 0; })
        .sort(function (a, b) { return b.count - a.count || a.id.localeCompare(b.id); })
        .slice(0, 10);
      if (!items.length) {
        box.innerHTML = '<p class="rank-empty">' + escH(t('trending.teams_empty')) + '</p>';
        return;
      }
      box.innerHTML = items.map(function (it, i) {
        return '<a class="rank-row' + (i < 3 ? ' top' : '') + '" href="#pack-' + escH(it.id) + '">' +
          '<span class="rank-no">' + (i + 1) + '</span>' +
          '<span class="rank-name">' + escH(it.name) + '</span>' +
          '<span class="cat chip">' + escH(it.kind) + '</span>' +
          '<span class="rank-n">' + it.count + '</span></a>';
      }).join('');
    }

    function refreshCounts() {
      if (!COUNTS_API) return;
      fetch(COUNTS_API + '/api/v1/counts')
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (data) {
          if (!data || !data.counts) return;
          var c = data.counts;
          Object.keys(c.bot || {}).forEach(function (id) { setCount(id, 'bot', c.bot[id]); });
          Object.keys(c.team || {}).forEach(function (id) { setCount(id, 'team', c.team[id]); });
          renderRank(c.bot || {});
          renderTeamRank(c.team || {});
        })
        .catch(function () {});
    }

    // ---------- 提交入口（GitHub 登录 / Issue 草稿 / 服务端直投） ----------
    var authBtn = document.getElementById('gh-login');
    var authState = document.getElementById('auth-state');
    var submitState = document.getElementById('submit-state');
    var submitForm = document.getElementById('submit-form');
    var sessionUser = null;

    function renderAuth() {
      if (!authBtn) return;
      if (sessionUser) {
        authBtn.textContent = t('submit.logout');
        if (authState) authState.textContent = t('submit.logged_in_as') + ' @' + sessionUser.login;
      } else {
        authBtn.textContent = t('submit.login');
        if (authState) authState.textContent = t('submit.login_hint');
      }
    }

    async function checkAuth() {
      if (!COUNTS_API || !authBtn) return;
      try {
        var r = await fetch(COUNTS_API + '/api/v1/auth/status', { credentials: 'include' });
        var data = await r.json();
        sessionUser = data && data.login && data.user ? data.user : null;
      } catch (e) {
        sessionUser = null;
      }
      renderAuth();
    }

    function readSubmitForm() {
      var fd = new FormData(submitForm);
      return {
        name: String(fd.get('name') || '').trim(),
        title: String(fd.get('title') || '').trim(),
        category: fd.get('category') || 'ops',
        autonomy: fd.get('autonomy') || 'L1',
        job: String(fd.get('job') || '').trim(),
        tagline: String(fd.get('tagline') || '').trim(),
        why: String(fd.get('why') || '').trim(),
        first_task: String(fd.get('first_task') || '').trim(),
        approval_never: String(fd.get('never') || '').split('\\n'),
        plugins: String(fd.get('plugins') || '').split(','),
        author: String(fd.get('author') || '').trim(),
        share_safe: !!fd.get('share_safe')
      };
    }

    function localDraftUrl(body) {
      var lines = [
        '### 名称 / 标题',
        '',
        '- name: ' + body.name,
        '- title: ' + body.title,
        '- category: ' + body.category,
        '- autonomy: ' + body.autonomy,
        '',
        '### One-sentence job',
        '',
        body.job,
        '',
        '### First task',
        '',
        body.first_task,
        '',
        '### Standing never-list',
        ''
      ];
      body.approval_never.forEach(function (x) {
        var v = String(x || '').trim();
        if (v) lines.push('- ' + v);
      });
      lines.push('', '### 提交人', '', body.author || '（匿名）');
      var p = new URLSearchParams();
      p.set('template', 'new-template.yml');
      p.set('title', 'template: ' + body.name);
      p.set('body', lines.join('\\n'));
      return GH + '/issues/new?' + p.toString();
    }

    async function sendSubmit(body) {
      if (submitState) submitState.textContent = t('submit.sending');
      if (!COUNTS_API) {
        window.open(localDraftUrl(body), '_blank');
        if (submitState) submitState.textContent = t('submit.draft_opened');
        return;
      }
      try {
        var r = await fetch(COUNTS_API + '/api/v1/submit', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
        var data = await r.json().catch(function () { return {}; });
        if (r.ok && data && data.ok) {
          toast(t('submit.success'));
          submitState.textContent = t('submit.success');
          if (data.url) {
            var a = document.createElement('a');
            a.href = data.url;
            a.target = '_blank';
            a.rel = 'noopener';
            a.textContent = data.url;
            submitState.appendChild(document.createTextNode(' '));
            submitState.appendChild(a);
          }
          submitForm.reset();
          return;
        }
        if (data && data.draft_url) {
          window.open(data.draft_url, '_blank');
          if (submitState) submitState.textContent = t('submit.draft_opened');
          return;
        }
        if (data && data.errors && data.errors.length) {
          submitState.textContent = data.errors.map(function (x) {
            return (x.field || '') + ': ' + (x.msg || '');
          }).join('；');
          toast(t('submit.error'));
          return;
        }
        submitState.textContent = (data && data.error) || t('submit.error');
        toast(t('submit.error'));
      } catch (e) {
        if (submitState) submitState.textContent = t('submit.network_error');
        toast(t('submit.network_error'));
      }
    }

    if (authBtn) {
      authBtn.addEventListener('click', function () {
        if (!COUNTS_API) return;
        var next = encodeURIComponent(location.href);
        location.href = sessionUser
          ? COUNTS_API + '/auth/logout?next=' + next
          : COUNTS_API + '/auth/github?next=' + next;
      });
    }

    if (submitForm) {
      submitForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        await sendSubmit(readSubmitForm());
      });
      var draftBtn = document.getElementById('gh-draft');
      if (draftBtn) {
        draftBtn.addEventListener('click', function () {
          sendSubmit(readSubmitForm());
        });
      }
    }

    applyView(true);
    if (currentView !== 'trending') refreshCounts();
    checkAuth();
