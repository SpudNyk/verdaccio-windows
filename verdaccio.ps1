$basedir = Split-Path $MyInvocation.MyCommand.Definition -Parent
$ret = 0
$verdaccio_cli = "$basedir/node_modules/verdaccio/bin/verdaccio" 

# Support pipeline input
if ($MyInvocation.ExpectingInput) {
    $input | & "node"  "$verdaccio_cli" $args
}
else {
    & "node"  "$verdaccio_cli" $args
}
$ret = $LASTEXITCODE
exit $ret
