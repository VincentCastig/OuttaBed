INSERT INTO device_table(device_time, device_id) VALUES($1,$2) ON CONFLICT (device_id) DO UPDATE SET device_time = EXCLUDED.device_time
RETURNING *
