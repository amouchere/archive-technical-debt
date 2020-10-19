---
title: Combiner plusieurs repo Git en un
date: 2015-12-10
tags: [Git]
---

But : Pouvoir merger plusieurs repo GIT en un seul sans perdre l’historique d’aucun repo.



```
# Clone both repositories into the same directory and go into repo A:

git clone A
git clone B
cd A

# Add a remote called B that points to the repo B  (do git remote -v to view your remotes),
# and fetch copies of all B’s branches:

git remote add B ../B
git fetch B

# To view all B’s branches that we’ve just fetched,
# do git branch -a. You should seeB/master in the list.
# Now, still in repo A, create a branch called B-master in repo A that tracks B/master.

git branch B-master B/master

# If you’re not already in the master branch, check it out, then merge B-master into A’s master.

git merge B-master

# Assuming you have no merge conflicts, you’re done!
```


[source](http://blog.caplin.com/2013/09/18/merging-two-git-repositories/)
