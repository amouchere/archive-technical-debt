---
title: Branche git et prompt shell
date: 2016-02-02
tags: ["Git", "Shell"]
description: "Affichage de la branche Git dans le prompt shell"
---
=======
UPDATE 2020


Utiliser plutôt [ Oh-my-zsh](https://github.com/ohmyzsh/ohmyzsh "Example") qui gère nativement cet affichage et possède de nombreuses autres features.

=======

![résultat](./prompt.png)

Télécharger dans son répertoire perso, le script SH qui fait le boulot:

```shell
curl https://raw.githubusercontent.com/git/git/master/contrib/completion/git-prompt.sh -o ~/.git-prompt.sh
```

Modifier son .bashrc
```shell
vi ~/.bashrc
```

Se placer à la ligne où on définit l'entête du prompt.
Executer le script précédemment téléchargé, puis modifier le prompt.
```shell
# Load in the git branch prompt script.
source ~/.git-prompt.sh

if [ "$color_prompt" = yes ]; then
   PS1='${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\e[33m\]$(__git_ps1 " (%s)")\[\e[m\]\$ '
   # PS1='${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w \[\e[33m\]$(__git_ps1 "(%s)")\[\033[01;34m\]\$\[\033[00m\] '
else
   PS1='[\u@\h \w$(__git_ps1 " (%s)")]\$ '
Fi
```

Mettre à jour son .bashrc
```shell
source ~/.bashrc
```

Source :
http://git-prompt.sh/


