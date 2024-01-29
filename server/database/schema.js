"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LIKE_TABLE = exports.COMMENT_TABLE = exports.POST_TABLE = exports.USER_TABLE = void 0;
exports.USER_TABLE = "\nCREATE TABLE IF NOT EXISTS users (\n    id INT NOT NULL AUTO_INCREMENT,\n    username VARCHAR(255) NOT NULL UNIQUE,\n    password VARCHAR(255) NOT NULL,\n    role ENUM('user', 'admin', 'moderator') NOT NULL DEFAULT 'user',\n    PRIMARY KEY (id)\n);\n";
exports.POST_TABLE = "\nCREATE TABLE IF NOT EXISTS posts (\n    id INT NOT NULL AUTO_INCREMENT,\n    user_id INT NOT NULL,\n    content TEXT NOT NULL,\n    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,\n    PRIMARY KEY (id),\n    FOREIGN KEY (user_id) REFERENCES users(id)\n);\n";
exports.COMMENT_TABLE = "\nCREATE TABLE IF NOT EXISTS comments (\n    id INT NOT NULL AUTO_INCREMENT,\n    post_id INT NOT NULL,\n    user_id INT NOT NULL,\n    comment TEXT NOT NULL,\n    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,\n    PRIMARY KEY (id),\n    FOREIGN KEY (post_id) REFERENCES posts(id),\n    FOREIGN KEY (user_id) REFERENCES users(id)\n);\n";
exports.LIKE_TABLE = "\nCREATE TABLE IF NOT EXISTS likes (\n    id INT NOT NULL AUTO_INCREMENT,\n    post_id INT NOT NULL,\n    user_id INT NOT NULL,\n    like_status BOOLEAN NOT NULL DEFAULT TRUE,\n    PRIMARY KEY (id),\n    FOREIGN KEY (post_id) REFERENCES posts(id),\n    FOREIGN KEY (user_id) REFERENCES users(id)\n);\n";