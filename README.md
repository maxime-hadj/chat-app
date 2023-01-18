# chat-app

npm i expo

npm i react-native-gifted-chat

npm i @react-navigation/native

npm i @react-navigation/stack

npm i react-native-elements

Ecran PrivateChatsListScreen => écran de la liste des conversations privées de l'utilisateur (comme sur Messenger)
Quand on clique sur un des éléments, on est envoyé vers la conversation privée ( donc PrivateChatScreen)

Ecran PrivateChatScreen => écran d'une conversation privée entre deux utilisateurs
Quand on fait précédent, on est envoyé vers le PrivateChatsListScreen
Si on clique sur le nom de l'utilisateur, on peut voir son profil

Ecran ChatroomsListScreen => écran avec liste des channels
Si on clique sur un channel, on est envoyé sur le channel en question ( donc ChatroomScreen)
l

Ecran ChatroomScreen => écran avec le contenu de conversation d'un channel 
Si on clique sur le nom du channel, on est envoyé vers la liste des participants du channel (écran à créer)

Ecran ProfileScreen => affichage du profil de l'utilisateur 
Si on clique sur le bouton modifier, on est envoyé vers l'écran UpdateProfileScreen

Ecran UsersListScreen => affichage de la liste des users
Si on clique sur un User on est envoyé vers la conversation privée avec ce user donc l'écran PrivateChatScreen

Ecran UpdateProfileScreen => écran avec form pour que l'utilisateur modifie ses infos, quand validé, retour vers le ProfileScreen


