SELECT
  `Message`.`id`,
  `Message`.`text`,
  `Users`.`id` AS `Users.id`,
  `Users`.`email` AS `Users.email`,
  `Users`.`password` AS `Users.password`,
  `Users`.`username` AS `Users.username`,
  `Users`.`firstname` AS `Users.firstname`,
  `Users`.`lastname` AS `Users.lastname`,
  `Users`.`bio` AS `Users.bio`,
  `Users`.`profilePicture` AS `Users.profilePicture`,
  `Users`.`isAdmin` AS `Users.isAdmin`,
  `Users`.`createdAt` AS `Users.createdAt`,
  `Users`.`updatedAt` AS `Users.updatedAt`,
  `Users->Like`.`messageId` AS `Users.Like.messageId`,
  `Users->Like`.`userId` AS `Users.Like.userId`,
  `Users->Like`.`createdAt` AS `Users.Like.createdAt`,
  `Users->Like`.`updatedAt` AS `Users.Like.updatedAt`
FROM
  `Messages` AS `Message`
  LEFT OUTER JOIN (
    `Likes` AS `Users->Like`
    INNER JOIN `Users` AS `Users` ON `Users`.`id` = `Users->Like`.`userId`
  ) ON `Message`.`id` = `Users->Like`.`messageId`