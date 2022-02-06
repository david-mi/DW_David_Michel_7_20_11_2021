SELECT
  `Message`.`id`,
  `Message`.`text`,
  `user`.`id` AS `user.id`,
  `user`.`email` AS `user.email`,
  `user`.`password` AS `user.password`,
  `user`.`username` AS `user.username`,
  `user`.`firstname` AS `user.firstname`,
  `user`.`lastname` AS `user.lastname`,
  `user`.`bio` AS `user.bio`,
  `user`.`profilePicture` AS `user.profilePicture`,
  `user`.`isAdmin` AS `user.isAdmin`,
  `user`.`createdAt` AS `user.createdAt`,
  `user`.`updatedAt` AS `user.updatedAt`
FROM
  `Messages` AS `Message`
  LEFT OUTER JOIN `Users` AS `user` ON `Message`.`UserId` = `user`.`id`;