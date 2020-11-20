INSERT INTO device_table(device_id, token) VALUES($1,$2)
RETURNING *
