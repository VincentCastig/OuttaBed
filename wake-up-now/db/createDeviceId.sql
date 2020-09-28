INSERT INTO device_time(device_time, device_id) VALUES($1,$2) ON CONFLICT (device_time) 
DO NOTHING;
RETURNING *