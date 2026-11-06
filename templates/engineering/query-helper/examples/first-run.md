# 示例首个运行 —— 查询助手

## 草稿 SQL — 示例结账（未运行）

**读取的 Schema**
- `db/migrate/0184_checkout_retries.sql` —— 表 `checkouts`, `checkout_attempts`
- 使用的列：`checkouts.id`, `checkouts.status`, `checkout_attempts.http_status`, `checkout_attempts.created_at`

**SELECT（供审查）**
```sql
SELECT c.id, a.http_status, count(*) AS n
FROM checkouts c
JOIN checkout_attempts a ON a.checkout_id = c.id
WHERE a.created_at >= :since
  AND a.http_status = 400
GROUP BY c.id, a.http_status;
```
解释了 PR #184 循环：多少个结账在 400 上重试。

**写入（草稿 —— 请勿执行）**
```sql
-- 请勿在实时环境运行
UPDATE checkouts SET status = 'failed' WHERE id = :id;
```
风险：`checkouts` 上的行锁；可能隐藏已付款订单。未执行。
实时写入：无。生产数据：未更改。凭据：此草稿中无。
