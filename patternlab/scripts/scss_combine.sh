# loop through your one_ files
topdir="/Users/minghuasun/Documents/Github/mayflower/patternlab/styleguide/source/assets/scss"
dir1="01-atoms"
dir2="06-theme/01-atoms"

for f in $topdir/$dir1/*.scss
do
    outf=$topdir/test/`basename $f .scss`.scss
    cp $f $outf
    
    [ -f $topdir/$dir2/`basename $f` ] && {
      echo "\n//theme" >> $outf
      cat $topdir/$dir2/`basename $f` >> $outf
    } || echo "Not found" 

done
