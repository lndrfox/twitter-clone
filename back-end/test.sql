SELECT U.login , U.t_name, M.content, M.date_message , M.id_message, 
COUNT(case R.reaction when "l" then 1 else null end) as nb_likes, 
COUNT(case R.reaction when "d" then 1 else null end) as nb_dislikes,
CASE WHEN EXISTS (SELECT * FROM reactions WHERE reaction ="l" AND login_user ="Bonjour" AND id_message = M.id_message)
THEN 1 ELSE 0 END AS user_liked, 
CASE WHEN R.reaction = "d" AND R.login_user = "Bonjour" THEN 1 ELSE 0 END AS user_disliked 
FROM users U JOIN messages M ON (U.login = M.login_poster) LEFT OUTER JOIN reactions R ON (R.id_message =  M.id_message)
GROUP BY M.id_message ORDER BY M.date_message DESC;

