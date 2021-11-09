
@ECHO off
GOTO start
:find_dp0
SET basedir=%~dp0
EXIT /b
:start
SETLOCAL
CALL :find_dp0
SET verdaccio_cli=%basedir%\node_modules\verdaccio\bin\verdaccio

endLocal & goto #_undefined_# 2>NUL || title %COMSPEC% & "node"  "%verdaccio_cli%" %*
