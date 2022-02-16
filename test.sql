SELECT
  `Message`.`id`,
  `Message`.`text`,
  `Message`.`attachment`,
  `Message`.`createdAt`,
  `Message`.`updatedAt`,
  `User`.`id` AS `User.id`,
  `User`.`username` AS `User.username`,
  `User`.`firstname` AS `User.firstname`,
  `User`.`lastname` AS `User.lastname`,
  `User`.`profilePicture` AS `User.profilePicture`,
  `MessageVotes`.`id` AS `MessageVotes.id`,
  `MessageVotes`.`isLiked` AS `MessageVotes.isLiked`,
  `MessageVotes->User`.`id` AS `MessageVotes.User.id`,
  `MessageVotes->User`.`id` AS `MessageVotes.User.userMessageVoted`,
  `MessageVotes->User`.`username` AS `MessageVotes.User.username`,
  `MessageVotes->User`.`firstname` AS `MessageVotes.User.firstname`,
  `MessageVotes->User`.`lastname` AS `MessageVotes.User.lastname`,
  `Comments`.`id` AS `Comments.id`,
  `Comments`.`id` AS `Comments.commentId`,
  `Comments`.`messageId` AS `Comments.messageId`,
  `Comments`.`text` AS `Comments.text`,
  `Comments`.`attachment` AS `Comments.attachment`,
  `Comments`.`createdAt` AS `Comments.createdAt`,
  `Comments`.`updatedAt` AS `Comments.updatedAt`,
  `Comments->User`.`id` AS `Comments.User.id`,
  `Comments->User`.`username` AS `Comments.User.username`,
  `Comments->User`.`firstname` AS `Comments.User.firstname`,
  `Comments->User`.`lastname` AS `Comments.User.lastname`,
  `Comments->User`.`profilePicture` AS `Comments.User.profilePicture`,
  `Comments->CommentVotes`.`id` AS `Comments.CommentVotes.id`,
  `Comments->CommentVotes`.`isLiked` AS `Comments.CommentVotes.isLiked`,
  `Comments->CommentVotes->User`.`id` AS `Comments.CommentVotes.User.id`,
  `Comments->CommentVotes->User`.`id` AS `Comments.CommentVotes.User.userCommentVoted`,
  `Comments->CommentVotes->User`.`username` AS `Comments.CommentVotes.User.username`,
  `Comments->CommentVotes->User`.`firstname` AS `Comments.CommentVotes.User.firstname`,
  `Comments->CommentVotes->User`.`lastname` AS `Comments.CommentVotes.User.lastname`
FROM
  `Messages` AS `Message`
  LEFT OUTER JOIN `Users` AS `User` ON `Message`.`UserId` = `User`.`id`
  LEFT OUTER JOIN `MessageVotes` AS `MessageVotes` ON `Message`.`id` = `MessageVotes`.`messageId`
  LEFT OUTER JOIN `Users` AS `MessageVotes->User` ON `MessageVotes`.`userId` = `MessageVotes->User`.`id`
  LEFT OUTER JOIN `Comments` AS `Comments` ON `Message`.`id` = `Comments`.`messageId`
  LEFT OUTER JOIN `Users` AS `Comments->User` ON `Comments`.`UserId` = `Comments->User`.`id`
  LEFT OUTER JOIN `CommentVotes` AS `Comments->CommentVotes` ON `Comments`.`id` = `Comments->CommentVotes`.`commentId`
  LEFT OUTER JOIN `Users` AS `Comments->CommentVotes->User` ON `Comments->CommentVotes`.`userId` = `Comments->CommentVotes->User`.`id`;