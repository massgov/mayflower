# Font compression scripts

The scripts below are used to compress and subset fonts with [pyftsubset](https://rsms.me/fonttools-docs/subset.html)

The script takes the specified ttf files, compresses them to only the glyphs  and featuress listed and outputs them in the new format overwriting the old oness in the same directory.

To use:
1. Install the [pyftsubset](https://rsms.me/fonttools-docs/subset.html) CLI
2. In the command line, navigate to the directory containing the fonts in the script you want to optimize
3. First test by running `pyftsubset`. If you get an error you may need to add it to your PATH
4. If not, copy the entire block for a script, paste it to the command line and enter
5. Run git status to test if the font files were updated

To subset eot files take the woff2 file output and upload it to [fontsquirrel](https://www.fontsquirrel.com) and use the basic setting.

### Latin woff

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

### Latin woff2

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

### Greek woff

```
pyftsubset\
  NotoSansGreek-Regular.ttf \
  --output-file="NotoSansGreek-Regular.woff" \
  --flavor=woff \
  --layout-features="kern,liga,clig,lnum,tnum"\
  --unicodes="U+0370-03FF, U+1F00-1FFF" &&

pyftsubset\
  NotoSansGreek-Bold.ttf \
  --output-file="NotoSansGreek-Bold.woff" \
  --flavor=woff \
  --layout-features="kern,liga,clig,lnum,tnum"\
  --unicodes="U+0370-03FF, U+1F00-1FFF" &&

pyftsubset\
  NotoSansGreek-VF.ttf \
  --output-file="NotoSansGreek-VF.woff" \
  --flavor=woff \
  --layout-features="kern,liga,clig,lnum,tnum,"\
  --unicodes="U+0370-03FF, U+1F00-1FFF" &&
```

### Greek woff2

```
pyftsubset\
  NotoSansGreek-Regular.ttf \
  --output-file="NotoSansGreek-Regular.woff2" \
  --flavor=woff2 \
  --layout-features="kern,liga,clig,lnum,tnum" \
  --unicodes="U+0370-03FF, U+1F00-1FFF" &&

pyftsubset\
  NotoSansGreek-Italic.ttf \
  --output-file="NotoSansGreek-Bold.woff2" \
  --flavor=woff2 \
  --layout-features="kern,liga,clig,lnum,tnum" \
  --unicodes="U+0370-03FF, U+1F00-1FFF" &&

pyftsubset\
  NotoSansGreek-VF.ttf \
  --output-file="NotoSansGreek-VF.woff2" \
  --flavor=woff2 \
  --layout-features="kern,liga,clig,lnum,tnum"\
  --unicodes="U+0370-03FF, U+1F00-1FFF"
```

### Cyrillic woff

```
pyftsubset\
  NotoSansCyrillic-Regular.ttf \
  --output-file="NotoSansCyrillic-Regular.woff" \
  --flavor=woff \
  --layout-features="kern,liga,clig,lnum,tnum"\
  --unicodes="U+0400-04FF, U+0500-052F, U+1C80-1C8F" &&

pyftsubset\
  NotoSansCyrillic-Bold.ttf \
  --output-file="NotoSansCyrillic-Bold.woff" \
  --flavor=woff \
  --layout-features="kern,liga,clig,lnum,tnum"\
  --unicodes="U+0400-04FF, U+0500-052F, U+1C80-1C8F" &&

pyftsubset\
  NotoSansCyrillic-VF.ttf \
  --output-file="NotoSansCyrillic-VF.woff" \
  --flavor=woff \
  --layout-features="kern,liga,clig,lnum,tnum,"\
  --unicodes="U+0400-04FF, U+0500-052F, U+1C80-1C8F"
```

### Cyrillic woff2

```
pyftsubset\
  NotoSansCyrillic-Regular.ttf \
  --output-file="NotoSansCyrillic-Regular.woff2" \
  --flavor=woff2 \
  --layout-features="kern,liga,clig,lnum,tnum" \
  --unicodes="U+0400-04FF, U+0500-052F, U+1C80-1C8F" &&

pyftsubset\
  NotoSansCyrillic-Bold.ttf \
  --output-file="NotoSansCyrillic-Bold.woff2" \
  --flavor=woff2 \
  --layout-features="kern,liga,clig,lnum,tnum" \
  --unicodes="U+0400-04FF, U+0500-052F, U+1C80-1C8F" &&

pyftsubset\
  NotoSansCyrillic-VF.ttf \
  --output-file="NotoSansCyrillic-VF.woff2" \
  --flavor=woff2 \
  --layout-features="kern,liga,clig,lnum,tnum"\
  --unicodes="U+0400-04FF, U+0500-052F, U+1C80-1C8F"
```

### Khmer woff

```
pyftsubset\
  NotoSansKhmer-Regular.woff \
  --output-file="NotoSansKhmer-Regular-subset.woff" \
  --flavor=woff \
  --layout-features="kern,liga,clig,lnum,tnum"\
  --unicodes="U+1780-17FF, U+19E0-19FF" &&

pyftsubset\
  NotoSansKhmer-Bold.woff \
  --output-file="NotoSansKhmer-Bold-subset.woff" \
  --flavor=woff \
  --layout-features="kern,liga,clig,lnum,tnum"\
  --unicodes="U+1780-17FF, U+19E0-19FF" &&

pyftsubset\
  NotoSansKhmer-VF.ttf \
  --output-file="NotoSansKhmer-VF-subset.woff" \
  --flavor=woff \
  --layout-features="kern,liga,clig,lnum,tnum,"\
  --unicodes="U+1780-17FF, U+19E0-19FF"
```

### Khmer woff2

```
pyftsubset\
  NotoSansKhmer-Regular.woff \
  --output-file="NotoSansKhmer-Regular-subset.woff2" \
  --flavor=woff2 \
  --layout-features="kern,liga,clig,lnum,tnum" \
  --unicodes="U+1780-17FF, U+19E0-19FF" &&

pyftsubset\
  NotoSansKhmer-Bold.woff \
  --output-file="NotoSansKhmer-Bold-subset.woff2" \
  --flavor=woff2 \
  --layout-features="kern,liga,clig,lnum,tnum" \
  --unicodes="U+1780-17FF, U+19E0-19FF" &&

pyftsubset\
  NotoSansKhmer-VF.ttf \
  --output-file="NotoSansKhmer-VF-subset.woff2" \
  --flavor=woff2 \
  --layout-features="kern,liga,clig,lnum,tnum"\
  --unicodes="U+1780-17FF, U+19E0-19FF"
```

### Hebrew woff

```
pyftsubset\
  NotoSansHebrew-Regular.woff \
  --output-file="NotoSansHebrew-Regular-subset.woff" \
  --flavor=woff \
  --layout-features="kern,liga,clig,lnum,tnum"\
  --unicodes="U+0590-05" &&

pyftsubset\
  NotoSansHebrew-Bold.woff \
  --output-file="NotoSansHebrew-Bold-subset.woff" \
  --flavor=woff \
  --layout-features="kern,liga,clig,lnum,tnum"\
  --unicodes="U+0590-05" &&

pyftsubset\
  NotoSansHebrew-VF.woff \
  --output-file="NotoSansHebrew-VF-subset.woff" \
  --flavor=woff \
  --layout-features="kern,liga,clig,lnum,tnum,"\
  --unicodes="U+0590-05"
```

### Hebrew woff2

```
pyftsubset\
  NotoSansHebrew-Regular.woff \
  --output-file="NotoSansHebrew-Regular-subset.woff2" \
  --flavor=woff2 \
  --layout-features="kern,liga,clig,lnum,tnum" \
  --unicodes="U+0590-05" &&

pyftsubset\
  NotoSansHebrew-Bold.woff \
  --output-file="NotoSansHebrew-Bold-subset.woff2" \
  --flavor=woff2 \
  --layout-features="kern,liga,clig,lnum,tnum" \
  --unicodes="U+0590-05" &&

pyftsubset\
  NotoSansHebrew-VF.woff \
  --output-file="NotoSansHebrew-VF-subset.woff2" \
  --flavor=woff2 \
  --layout-features="kern,liga,clig,lnum,tnum"\
  --unicodes="U+0590-05"
```

### Arabic woff

```
pyftsubset\
  NotoSansArabic-Regular.woff \
  --output-file="NotoSansArabic-Regular-subset.woff" \
  --flavor=woff \
  --layout-features="kern,liga,clig,lnum,tnum"\
  --unicodes="U+0600-06FF, U+0750-077F" &&

pyftsubset\
  NotoSansArabic-Bold.woff \
  --output-file="NotoSansArabic-Bold-subset.woff" \
  --flavor=woff \
  --layout-features="kern,liga,clig,lnum,tnum"\
  --unicodes="U+0600-06FF, U+0750-077F" &&

pyftsubset\
  NotoSansArabic-VF.woff \
  --output-file="NotoSansArabic-VF-subset.woff" \
  --flavor=woff \
  --layout-features="kern,liga,clig,lnum,tnum,"\
  --unicodes="U+0600-06FF, U+0750-077F"
```

### Arabic woff2

```
pyftsubset\
  NotoSansArabic-Regular.woff \
  --output-file="NotoSansArabic-Regular-subset.woff2" \
  --flavor=woff2 \
  --layout-features="kern,liga,clig,lnum,tnum" \
  --unicodes="U+0600-06FF, U+0750-077F" &&

pyftsubset\
  NotoSansArabic-Bold.woff \
  --output-file="NotoSansArabic-Bold-subset.woff2" \
  --flavor=woff2 \
  --layout-features="kern,liga,clig,lnum,tnum" \
  --unicodes="U+0600-06FF, U+0750-077F" &&

pyftsubset\
  NotoSansArabic-VF.woff \
  --output-file="NotoSansArabic-VF-subset.woff2" \
  --flavor=woff2 \
  --layout-features="kern,liga,clig,lnum,tnum"\
  --unicodes="U+0600-06FF, U+0750-077F"
```

### Myanmar woff

```
pyftsubset\
  NotoSansMyanmar-Regular.woff \
  --output-file="NotoSansMyanmar-Regular-subset.woff" \
  --flavor=woff \
  --layout-features="kern,liga,clig,lnum,tnum"\
  --unicodes="U+1000-109F, U+AA60-AA7F, U+A9E0-A9FF" &&

pyftsubset\
  NotoSansMyanmar-Bold.woff \
  --output-file="NotoSansMyanmar-Bold-subset.woff" \
  --flavor=woff \
  --layout-features="kern,liga,clig,lnum,tnum"\
  --unicodes="U+1000-109F, U+AA60-AA7F, U+A9E0-A9FF" &&

pyftsubset\
  NotoSansMyanmar-VF.woff \
  --output-file="NotoSansMyanmar-VF-subset.woff" \
  --flavor=woff \
  --layout-features="kern,liga,clig,lnum,tnum,"\
  --unicodes="U+1000-109F, U+AA60-AA7F, U+A9E0-A9FF"
```

### Myanmar woff2

```
pyftsubset\
  NotoSansMyanmar-Regular.woff \
  --output-file="NotoSansMyanmar-Regular-subset.woff2" \
  --flavor=woff2 \
  --layout-features="kern,liga,clig,lnum,tnum" \
  --unicodes="U+1000-109F, U+AA60-AA7F, U+A9E0-A9FF" &&

pyftsubset\
  NotoSansMyanmar-Regular.woff \
  --output-file="NotoSansMyanmar-Regular-subset.woff2" \
  --flavor=woff2 \
  --layout-features="kern,liga,clig,lnum,tnum" \
  --unicodes="U+1000-109F, U+AA60-AA7F, U+A9E0-A9FF" &&

pyftsubset\
  NotoSansMyanmar-VF.woff \
  --output-file="NotoSansMyanmar-VF-subset.woff2" \
  --flavor=woff2 \
  --layout-features="kern,liga,clig,lnum,tnum"\
  --unicodes="U+1000-109F, U+AA60-AA7F, U+A9E0-A9FF"
```
