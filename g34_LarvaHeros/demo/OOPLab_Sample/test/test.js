
var replay = Framework.Replay;
QUnit.module( "Bombman Test", {
    setup: function()
    {
      replay.start();
    },
    teardown: function()
    {
      replay.stop();
    }
});

QUnit.asyncTest( "Test Move", function( assert ) {
    Framework.Replay.waitFor(260);
    Framework.Replay.keyDown('Right');
    Framework.Replay.waitFor(13);

    Framework.Replay.keyUp('Right');
    Framework.Replay.waitFor(782);
    Framework.Replay.keyDown('Space');
    Framework.Replay.waitFor(19);
    Framework.Replay.keyUp('Space');
    replay.assertEqual("practice.pic.position.x", 1340);
});