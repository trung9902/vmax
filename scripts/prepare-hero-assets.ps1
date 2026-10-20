# Crop transparent margins and resize imagegen outputs; preserve alpha.
# Run from the project root: powershell -File scripts/prepare-hero-assets.ps1
param([switch]$WebP)

Add-Type -AssemblyName System.Drawing
Add-Type -TypeDefinition @'
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Drawing.Drawing2D;
using System.Runtime.InteropServices;
public static class HeroAssets {
    public static void Prepare(string input, string output, int maxWidth) {
        using (var image = new Bitmap(input)) {
            var pixels = image.LockBits(new Rectangle(0,0,image.Width,image.Height), ImageLockMode.ReadOnly, PixelFormat.Format32bppArgb);
            var buffer = new byte[pixels.Stride * pixels.Height];
            Marshal.Copy(pixels.Scan0,buffer,0,buffer.Length);
            int x1=image.Width,y1=image.Height,x2=0,y2=0;
            for(int y=0;y<image.Height;y++) for(int x=0;x<image.Width;x++) {
                if(buffer[y*pixels.Stride+x*4+3] > 12) {
                    x1=Math.Min(x1,x);y1=Math.Min(y1,y);x2=Math.Max(x2,x);y2=Math.Max(y2,y);
                }
            }
            image.UnlockBits(pixels);
            x1=Math.Max(0,x1-2);y1=Math.Max(0,y1-2);
            x2=Math.Min(image.Width-1,x2+2);y2=Math.Min(image.Height-1,y2+2);
            int cropWidth=x2-x1+1,cropHeight=y2-y1+1;
            int width=Math.Min(maxWidth,cropWidth),height=(int)Math.Round((double)cropHeight*width/cropWidth);
            using(var result = new Bitmap(width,height,PixelFormat.Format32bppArgb)) {
                using(var graphics=Graphics.FromImage(result)) {
                    graphics.Clear(Color.Transparent);
                    graphics.CompositingMode=CompositingMode.SourceCopy;
                    graphics.InterpolationMode=InterpolationMode.HighQualityBicubic;
                    graphics.PixelOffsetMode=PixelOffsetMode.HighQuality;
                    graphics.DrawImage(image,new Rectangle(0,0,width,height),new Rectangle(x1,y1,cropWidth,cropHeight),GraphicsUnit.Pixel);
                }
                result.Save(output,ImageFormat.Png);
            }
            Console.WriteLine(output+": "+width+"x"+height+" (source bounds "+x1+","+y1+","+cropWidth+","+cropHeight+")");
        }
    }
}
'@ -ReferencedAssemblies System.Drawing

$assetRoot = Join-Path $PSScriptRoot '..\assets'
[HeroAssets]::Prepare((Join-Path $assetRoot 'hero-laptop-source.png'), (Join-Path $assetRoot 'hero-laptop.png'), 1200)
[HeroAssets]::Prepare((Join-Path $assetRoot 'hero-phone-source.png'), (Join-Path $assetRoot 'hero-phone.png'), 480)

$background = [System.Drawing.Image]::FromFile((Join-Path $assetRoot 'hero-background-source.png'))
$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$jpegParameters = New-Object System.Drawing.Imaging.EncoderParameters(1)
$jpegParameters.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]90)
$background.Save((Join-Path $assetRoot 'hero-background.jpg'), $jpegCodec, $jpegParameters)
$background.Dispose()
$jpegParameters.Dispose()

if ($WebP) {
    foreach ($device in @('laptop', 'phone')) {
        & npx --yes --package=sharp-cli sharp -i (Join-Path $assetRoot "hero-$device.png") -o (Join-Path $assetRoot "hero-$device.webp") -f webp -q 90 --alphaQuality 100 --effort 6
        if ($LASTEXITCODE -ne 0) { throw "Could not encode hero-$device.webp" }
    }
}
