package migrations

import (
	"fmt"

	"github.com/lulzshadowwalker/go-next/pkg/logger"
)

func (m *Migration) posts() error {
	_, err := m.db.Exec(`
		CREATE TABLE IF NOT EXISTS posts(
			id INT PRIMARY KEY AUTO_INCREMENT,
			author INT NOT NULL REFERENCES users(id),
			title NVARCHAR(150) NOT NULL,
			body TEXT NOT NULL,
			cover_picture NVARCHAR(255) NOT NULl,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP(),
			updated_at DATETIME DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()
		);
	`)
	if err != nil {
		logger.E.Printf("cannot migrate the posts table %q\n", err)
		return fmt.Errorf("cannot migrate the posts table %w\n", err)
	}

	logger.V.Println("posts table migration successfull")
	return nil
}
