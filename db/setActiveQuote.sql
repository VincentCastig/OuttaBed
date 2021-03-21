UPDATE quotes SET active = TRUE
where id = (SELECT id
FROM quotes
ORDER BY random()
LIMIT 1);
