# Fix encoding script
$filePath = 'd:\Yazan Nasser\FutureGEN\js\main.js'

# Read the file as bytes
$bytes = [System.IO.File]::ReadAllBytes($filePath)

# The text is currently double-encoded - UTF-8 bytes were saved as if they were Latin-1
# We need to re-interpret the bytes correctly
$text = [System.Text.Encoding]::GetEncoding('ISO-8859-1').GetString($bytes)

# The text now contains UTF-8 sequences as ASCII - decode properly
$correctBytes = [System.Text.Encoding]::GetEncoding('ISO-8859-1').GetBytes($text)
$correctText = [System.Text.Encoding]::UTF8.GetString($correctBytes)

# Write back with proper UTF-8 BOM
[System.IO.File]::WriteAllText($filePath, $correctText, [System.Text.UTF8Encoding]::new($true))

Write-Host "Done fixing encoding"
