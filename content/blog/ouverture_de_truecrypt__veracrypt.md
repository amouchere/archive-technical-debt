---
title: Ouverture de TrueCrypt / VeraCrypt
date: 2015-04-17
tags: ["TrueCrypt", "Windows"]
---

```bash
# TrueCrypt
SET TC_PATH=“C:\Program Files\TrueCrypt”
SET DRIVE_LETTER=M
SET TC_VOLUME_NAME=truecrypt\myTrueCryptFile.tc
SET TC_VOLUME_PWD=****

%TC_PATH%\TrueCrypt.exe /l%DRIVE_LETTER% /v %TC_VOLUME_NAME% /p %TC_VOLUME_PWD% /q /b


# VeraCrypt
SET HC_PATH=“C:\Program Files\VeraCrypt”
SET DRIVE_LETTER=I
SET HC_VOLUME_NAME=truecrypt\myVeraCryptFile.hc
SET HC_VOLUME_PWD=****

%HC_PATH%\VeraCrypt.exe /l%DRIVE_LETTER% /v %HC_VOLUME_NAME% /p %HC_VOLUME_PWD% /q /b

```
