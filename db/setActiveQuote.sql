UPDATE quotes SET active = NOT active WHERE id = $1 OR active = TRUE
