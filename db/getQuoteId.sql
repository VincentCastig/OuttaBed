SELECT id FROM quotes
ORDER BY RANDOM()
LIMIT 1;

-- SELECT id, LAG(active, 1) OVER(ORDER BY active) previous FROM quotes limit 1;
