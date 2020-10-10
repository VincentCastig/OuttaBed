INSERT INTO device_table(device_id, token) VALUES($1,$2) ON CONFLICT (device_id) DO UPDATE SET token = EXCLUDED.token
RETURNING *
