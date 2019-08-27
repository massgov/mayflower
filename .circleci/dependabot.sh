git log --pretty=oneline --abbrev-commit | head -n 1 | tee -a  changelogs/dependabot.md
branch=$(git branch | grep \* | cut -d ' ' -f2)
git add .
git commit -m "Add changelog to branch"
echo "Commit changelog";
git push -u origin $branch
