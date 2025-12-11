
# resize image
ffmpeg -i $imageFile -vf scale=$size:-1 -q 1 $newImageFile


# resize png image without loosing transparency
ffmpeg -i x.png -vf scale=75:-1 -pred mixed -y  -pix_fmt rgba caddyLogoS.png


# animated gif creation
ffmpeg -i x.mov -filter_complex "[0:v] fps=12,scale=480:-1,split [a][b];[a] palettegen [p];[b][p] paletteuse" x.gif

# Launch multiple OBS
open -n -a OBS.app
# Display properties crop 2500, 1400
# Multi cam editing in DaVinci
# https://www.youtube.com/watch?v=ZzPZe36RdkU
