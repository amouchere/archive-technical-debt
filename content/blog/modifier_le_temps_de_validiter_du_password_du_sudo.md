---
title: Modifier le temps de validiter du password du SUDO
date: 2016-04-22
tags: ["Linux", "Shell"]
---

Dans un terminal, lancer la commande :
```shell
sudo visudo
```

Chercher la ligne:
```shell
Defaults        env_reset
```

Et modifier cette ligne en:
```shell
Defaults        env_reset,timestamp_timeout=30
```

**30** est en minute le temps de validité du mot de passe lors d’un sudo.
**0** permet de demander un mot de passe systématiquement.
**-1** permet de ne jamais demander de mot de passe.
