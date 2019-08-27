branch=$(git branch | grep \* | cut -d ' ' -f2)
lastCommit=$(git log --pretty=oneline --abbrev-commit | head -n 1)
lastDependabot=$(git log --author="dependabot-preview" --pretty=oneline --abbrev-commit | head -n 1)

if [ "$lastCommit" = "$lastDependabot" ]
then
  echo "- [Dependencies] $lastCommit" >> changelogs/dependabot.md
  git add changelogs/dependabot.md
  git commit -m "Add changelog to changelogs/dependabot.md"
  echo "Commit dependabot changelog";
  git remote add origin git@github.com:massgov/mayflower.git
  git push -u origin $branch
else
  echo "No changelog added"
fi
