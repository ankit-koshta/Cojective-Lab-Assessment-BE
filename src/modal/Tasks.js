const taskTable = `
CREATE TABLE IF NOT EXISTS tasks (
    id int NOT NULL AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    deadline varchar(255) NOT NULL,
    description varchar(255) NOT NULL,
    priority ENUM('medium', 'high', 'very-high') DEFAULT 'medium',
    created_at datetime DEFAULT CURRENT_TIMESTAMP,
    updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
) AUTO_INCREMENT = 1`;

module.exports = [taskTable];
