SELECT id, LAG(active, 1) OVER(ORDER BY active) previous FROM quotes limit 1;
