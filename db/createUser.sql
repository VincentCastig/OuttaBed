INSERT INTO device_table(device_id, device_id_unique, token) VALUES($1, $1, $2) ON CONFLICT (device_id_unique) DO NOTHING
RETURNING *
