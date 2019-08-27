branch=$(git branch | grep \* | cut -d ' ' -f2)
lastCommit=$(git log --pretty=oneline --abbrev-commit | head -n 1)
lastDependabot=$(git log --author="dependabot-preview" --pretty=oneline --abbrev-commit | head -n 1)

if [ "$lastCommit" = "$lastDependabot" ]
then
  lastCommit | tee -a  changelogs/dependabot.md
  git add changelogs/dependabot.md
  git commit -m "Add changelog to branch"
  echo "Commit changelog";
  git remote add origin git@github.com:massgov/mayflower.git
  git push -u origin $branch
else
  echo "Nothing to commit"
fi
