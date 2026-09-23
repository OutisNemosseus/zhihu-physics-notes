param([string]$Only = 'p12-35')
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
Add-Type -AssemblyName System.Windows.Forms
Add-Type @'
using System;
using System.Runtime.InteropServices;
public class Ch12Window {
 [DllImport("user32.dll")] public static extern bool PrintWindow(IntPtr h, IntPtr dc, uint flags);
 [DllImport("user32.dll")] public static extern bool GetWindowRect(IntPtr h,out RECT r);
 [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr h);
 [DllImport("user32.dll")] public static extern bool ShowWindow(IntPtr h,int n);
 [DllImport("user32.dll")] public static extern bool SetProcessDPIAware();
 public struct RECT {public int L,T,R,B;}
}
'@
[Ch12Window]::SetProcessDPIAware() | Out-Null
$repo = Split-Path $PSScriptRoot -Parent
$engine = Join-Path $env:LOCALAPPDATA 'Programs\ADI\LTspice\LTspice.exe'
$base = Join-Path $repo 'docs\assets\downloads\ch12-20-60'
$dest = Join-Path $repo 'docs\assets\images\ch12-spice'
New-Item -ItemType Directory -Force $dest | Out-Null
$files = Get-ChildItem $base -Recurse -Filter 'AC.asc' | Where-Object { $Only -eq 'all' -or $_.Directory.Name -eq $Only }
if ($Only -eq 'p12-40') { $files = @(Get-Item (Join-Path $repo 'docs\assets\downloads\p12-40\P12_40_Auto.asc')) }
foreach ($file in $files) {
 foreach ($view in @('schematic','run')) {
 $path=Join-Path $dest ($file.Directory.Name+'-'+$view+'.png')
 if ((Test-Path $path) -and (Get-Item $path).LastWriteTime -gt $file.LastWriteTime) { continue }
 $arguments = @('-big', ('"'+$file.FullName+'"'))
 if ($view -eq 'run') { $arguments = @('-big','-Run', ('"'+$file.FullName+'"')) }
 $p = Start-Process -FilePath $engine -ArgumentList $arguments -PassThru
 Start-Sleep -Milliseconds 1600
 $p.Refresh()
 $h = $p.MainWindowHandle

 [Ch12Window]::ShowWindow($h,3) | Out-Null
 [Ch12Window]::SetForegroundWindow($h) | Out-Null
 Start-Sleep -Milliseconds 700
 $r = New-Object Ch12Window+RECT
 $valid = $false
 for ($attempt=0; $attempt -lt 12; $attempt++) {
  $p.Refresh(); $h = $p.MainWindowHandle
  if ($h -ne 0) {
   [Ch12Window]::ShowWindow($h,3) | Out-Null
   [Ch12Window]::SetForegroundWindow($h) | Out-Null
   $valid=[Ch12Window]::GetWindowRect($h,[ref]$r)
   if ($valid -and ($r.R-$r.L) -gt 100 -and ($r.B-$r.T) -gt 100) { break }
  }
  Start-Sleep -Milliseconds 500
 }
 if (!$valid -or ($r.R-$r.L) -le 100 -or ($r.B-$r.T) -le 100) { throw "Unable to capture a visible window: $($file.FullName)" }
 $bmp = New-Object Drawing.Bitmap ($r.R-$r.L),($r.B-$r.T)
 $g = [Drawing.Graphics]::FromImage($bmp)
 $dc=$g.GetHdc()
 $ok=[Ch12Window]::PrintWindow($h,$dc,2)
 $g.ReleaseHdc($dc)
 if (!$ok) { throw 'PrintWindow failed' }
 $path=Join-Path $dest ($file.Directory.Name+'-'+$view+'.png')
 $bmp.Save($path,[Drawing.Imaging.ImageFormat]::Png)
 $g.Dispose();$bmp.Dispose()
 Write-Output $path
 # Close only the instance launched by this script. Existing user sessions are not touched.
 $p.CloseMainWindow() | Out-Null
 if (!$p.WaitForExit(5000)) { $p.Kill(); $p.WaitForExit() }
}
}
