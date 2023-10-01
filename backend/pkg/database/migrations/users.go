package migrations

import (
	"fmt"

	"github.com/lulzshadowwalker/go-next/pkg/logger"
)

func (m *Migration) users() error {
	_, err := m.db.Exec(`
		CREATE TABLE IF NOT EXISTS users(
			id INT PRIMARY KEY AUTO_INCREMENT,
			name NVARCHAR(50) NOT NULL,
			email NVARCHAR(254) UNIQUE NOT NULL,
			password NVARCHAR(100) NOT NULL,
			profile_picture NVARCHAR(255)
		);
	`)
	if err != nil {
		logger.E.Printf("cannot migrate the users table %q\n", err)
		return fmt.Errorf("cannot migrate the users table %q\n", err)
	}

	logger.V.Println("users table migration successful")
	return nil
}
