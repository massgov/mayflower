# Font compression scripts

The scripts below are used to compress and subset fonts with [pyftsubset](https://rsms.me/fonttools-docs/subset.html)

The script takes the specified ttf files, compresses them to only the glyphs  and featuress listed and outputs them in the new format overwriting the old oness in the same directory.

To use:
1. Install the [pyftsubset](https://rsms.me/fonttools-docs/subset.html) CLI
2. In the command line, navigate to the directory containing the fonts in the script you want to optimize
3. First test by running `pyftsubset`. If you get an error you may need to add it to your PATH
4. If not, copy the entire block for a script, paste it to the command line and enter
5. Run git status to test if the font files were updated

```
pyftsubset\
  NotoSansItalic-VF.ttf \
  --output-file="NotoSansItalic-VF.woff" \
  --flavor=woff \
  --layout-features="kern,liga,clig,lnum,tnum"\
  --unicodes="U+0000-00FF, U+FB00-FB05, U+2018-2019, U+201C-201D"
```

### woff

```
pyftsubset\
  NotoSans-Regular.ttf \
  --output-file="NotoSans-Regular.woff" \
  --flavor=woff \
  --layout-features="kern,liga,clig,lnum,tnum"\
  --unicodes="U+0000-00FF, U+FB00-FB05, U+2018-2019, U+201C-201D" &&

pyftsubset\
  NotoSans-Italic.ttf \
  --output-file="NotoSans-Italic.woff" \
  --flavor=woff \
  --layout-features="kern,liga,clig,lnum,tnum"\
  --unicodes="U+0000-00FF, U+FB00-FB05, U+2018-2019, U+201C-201D" &&

pyftsubset\
  NotoSans-VF.ttf \
  --output-file="NotoSans-VF.woff" \
  --flavor=woff \
  --layout-features="kern,liga,clig,lnum,tnum,"\
  --unicodes="U+0000-00FF, U+FB00-FB05, U+2018-2019, U+201C-201D" &&

pyftsubset\
  NotoSansItalic-VF.ttf \
  --output-file="NotoSansItalic-VF.woff" \
  --flavor=woff \
  --layout-features="kern,liga,clig,lnum,tnum"\
  --unicodes="U+0000-00FF, U+FB00-FB05, U+2018-2019, U+201C-201D" &&
```

### woff2

```
pyftsubset\
  NotoSans-Regular.ttf \
  --output-file="NotoSans-Regular.woff2" \
  --flavor=woff2 \
  --layout-features="kern,liga,clig,lnum,tnum" \
  --unicodes="U+0000-00FF, U+FB00-FB05, U+2018-2019, U+201C-201D" &&

pyftsubset\
  NotoSans-Italic.ttf \
  --output-file="NotoSans-Italic.woff2" \
  --flavor=woff2 \
  --layout-features="kern,liga,clig,lnum,tnum" \
  --unicodes="U+0000-00FF, U+FB00-FB05, U+2018-2019, U+201C-201D" &&

pyftsubset\
  NotoSans-VF.ttf \
  --output-file="NotoSans-VF.woff2" \
  --flavor=woff2 \
  --layout-features="kern,liga,clig,lnum,tnum"\
  --unicodes="U+0000-00FF, U+FB00-FB05, U+2018-2019, U+201C-201D" &&

pyftsubset\
  NotoSansItalic-VF.ttf \
  --output-file="NotoSansItalic-VF.woff2" \
  --flavor=woff2 \
  --layout-features="kern,liga,clig,lnum,tnum"\
  --unicodes="U+0000-00FF, U+FB00-FB05, U+2018-2019, U+201C-201D"
```
