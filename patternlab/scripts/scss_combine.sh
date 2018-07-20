# cd into patternlab folder
root=$(pwd)
topdir=$root/"styleguide/source/assets/scss"
dir1="04-templates"
dir2="06-theme/"$dir1

for f in $topdir/$dir1/*.scss
do
    outf=$topdir/$dir1/`basename $f .scss`.scss
    cp $f $outf
    
    [ -f $topdir/$dir2/`basename $f` ] && {
      echo "\n//theme" >> $outf
      cat $topdir/$dir2/`basename $f` >> $outf
    } || echo "No theme for `basename $f`" 

done
