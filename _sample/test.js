/**
 * Created by nhyun.kyung on 2017-01-12.
 */

try {
    var oc = require('../');

    /** Function Test : DeepCopy in objectConverter */


    // console.log(oc.deepCopyWithRecursive({
    //     1: 1,
    //     2: 2
    // }));
    // console.log(oc.deepCopyWithRecursive([1, 2, 3]));
    // console.log(oc.deepCopyWithRecursive(1));
    // console.log(oc.deepCopyWithRecursive("data"));
    // console.log(oc.deepCopyWithRecursive(null));
    // console.log(oc.deepCopyWithRecursive());
    // console.log(oc.deepCopyWithRecursive({
    //     1: [1, 2, 3],
    //     2: "isString",
    //     3: {
    //         4: 1,
    //         5: null,
    //         6: undefined
    //     }
    // }));

    var origin_A = {
        name: "origin_A",
        origin_B: {
            name: "origin_B",
            origin_C: {
                name: "origin_C"
            }
        }
    };
    origin_A.origin_B.origin_C.origin_A = origin_A;
    var copy_A = oc.deepCopyWithRecursive(origin_A);

    origin_A.origin_B.name = "origin_edit_E";
    copy_A.name = "copy_A";
    
    console.log(copy_A.name, copy_A.origin_B.name, copy_A.origin_B.origin_C.origin_A.name);





    process.on("SIGINT", function () {
        console.log("Exit Sample, Please wait a moment.");

        setTimeout(function () {
            process.exit(0);
        }, 3000);
    });


} catch (ex) {
    console.error(ex.stack);
}
