WITH top_blocks AS (
    SELECT block_height
    FROM test_txs
    GROUP BY block_height
    ORDER BY block_height DESC
    LIMIT $1
)
SELECT *
FROM test_txs
WHERE block_height IN (SELECT block_height FROM top_blocks)
ORDER BY block_height DESC;
