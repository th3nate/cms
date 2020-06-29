:: # Set Variable ::
Set Key="C:\code\cms\cmsKeyPair.pem"

:: # Remove Inheritance ::
Cmd /c Icacls %Key% /c /t /Inheritance:d

:: # Set Ownership to Owner ::
Cmd /c Icacls %Key% /c /t /Grant Administrator "Authenticated Users" BUILTIN\Administrators BUILTIN Everyone System Users:F

:: # Verify ::
Cmd /c Icacls %Key%
