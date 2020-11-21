DELETE from device_table where id = VALUES($1)
RETURNING *
