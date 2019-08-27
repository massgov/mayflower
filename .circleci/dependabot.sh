git log --pretty=oneline --abbrev-commit | head -n 1 | tee -a  changelogs/dependabot.md
branch=$(git branch | grep \* | cut -d ' ' -f2)
git add .
git commit -m "Add changelog to branch"
echo "Commit changelog";
git config user.email "clairesunstudio@gmail.com"
git config user.name "circleci"
git remote add origin git@github.com:massgov/mayflower.git
git push -u origin $branch
echo "Push to repo";
