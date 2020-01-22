@echo off
setlocal
echo.
echo ```text
node "%~dp0\service.js" help
echo ```
echo.
echo ### Install
echo.
echo ```text
node "%~dp0\service.js" install --help
echo ```
echo.
echo ### Uninstall
echo.
echo ```text
node "%~dp0\service.js" uninstall --help
echo ```
echo.
echo ### Start
echo.
echo ```text
node "%~dp0\service.js" start --help
echo ```
echo.
echo ### Stop
echo.
echo ```text
node "%~dp0\service.js" stop --help
echo ```
echo.
echo ### Restart
echo.
echo ```text
node "%~dp0\service.js" restart --help
echo ```
echo.
