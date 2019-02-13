CREATE TABLE IF NOT EXISTS  `blog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` longtext DEFAULT NULL,
  `create_time` DATETIME DEFAULT NULL,
  `modified_time` DATETIME DEFAULT NULL,
  `type` varchar(20) NOT NULL,
  `author` varchar(20) NOT NULL,
  `author_id` varchar(20) NOT NULL,
  `pv` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
