param([string]$Only = '', [switch]$NetlistOnly)
$ErrorActionPreference = 'Stop'
$repo = Split-Path $PSScriptRoot -Parent
$engine = Join-Path $env:LOCALAPPDATA 'Programs\ADI\LTspice\LTspice.exe'
$base = Join-Path $repo 'docs\assets\downloads\ch12-20-60'
$schematics = Get-ChildItem $base -Recurse -Filter '*.asc' | Where-Object { !$Only -or $_.Directory.Name -eq $Only }
foreach ($file in $schematics) {
  $p = Start-Process -FilePath $engine -ArgumentList @('-netlist',('"'+$file.FullName+'"')) -PassThru
  if (!$p.WaitForExit(30000)) { throw "Netlisting timed out: $($file.FullName)" }
}
if ($NetlistOnly) { exit }
if ($Only -eq 'p12-40') {
 $file = Get-Item (Join-Path $repo 'docs\assets\downloads\p12-40\P12_40_Auto.asc')
 $p = Start-Process -FilePath $engine -ArgumentList @('-b',('"'+$file.FullName+'"')) -PassThru
 if (!$p.WaitForExit(30000)) { throw '12.40 timed out' }
 Write-Output ('12.40 ASC batch exit=' + $p.ExitCode)
 exit $p.ExitCode
}
$files = Get-ChildItem $base -Recurse -Filter '*.cir' | Where-Object { !$Only -or $_.Directory.Name -eq $Only }
foreach ($file in $files) {
  $p = Start-Process -FilePath $engine -ArgumentList @('-b',('"'+$file.FullName+'"')) -PassThru
  if (!$p.WaitForExit(30000)) { throw "LTspice timed out: $($file.FullName)" }
  $log = [IO.Path]::ChangeExtension($file.FullName,'.log')
  if (!(Test-Path $log)) { throw "Missing engine log: $log" }
  Write-Output ($file.Directory.Name + '/' + $file.Name + ' exit=' + $p.ExitCode)
  if ($p.ExitCode -ne 0) { throw "LTspice failed: $($file.FullName)" }
}
