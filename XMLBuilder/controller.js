export function build($file, model, ) {
    fs.writeFileSync($file, model.head, (err) => {
        if (err) throw err;
        console.log('saved!');
    });

    fs.appendFileSync($file, model.bodyTest, (err) => {
        if (err) throw err;
        console.log();
    });

    fs.appendFileSync($file, model.foot);
}