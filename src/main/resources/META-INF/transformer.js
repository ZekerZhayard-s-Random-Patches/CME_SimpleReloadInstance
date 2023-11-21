
var ASMAPI = Java.type("net.minecraftforge.coremod.api.ASMAPI");
var Opcodes = Java.type("org.objectweb.asm.Opcodes");
var InsnNode = Java.type("org.objectweb.asm.tree.InsnNode");
var MethodInsnNode = Java.type("org.objectweb.asm.tree.MethodInsnNode");

function initializeCoreMod() {
    return {
        "ReloadableResourceManager_<init>": {
            "target": {
                "type": "METHOD",
                "class": "net/minecraft/server/packs/resources/ReloadableResourceManager",
                "methodName": "<init>",
                "methodDesc": "(Lnet/minecraft/server/packs/PackType;)V"
            },
            "transformer": function (mn) {
                var insnList = mn.instructions.toArray();
                for (var i = 0; i < insnList.length; i++) {
                    var node = insnList[i];
                    if (node.getOpcode() === Opcodes.PUTFIELD && node.owner.equals("net/minecraft/server/packs/resources/ReloadableResourceManager") && node.name.equals(ASMAPI.mapField("f_203816_")) && node.desc.equals("Ljava/util/List;")) {
                        mn.instructions.insertBefore(node, new InsnNode(Opcodes.POP));
                        mn.instructions.insertBefore(node, new MethodInsnNode(Opcodes.INVOKESTATIC, "io/github/zekerzhayard/cme_simplereloadinstance/CopyOnWriteArrayListWithMutableIterator", "create", "()Ljava/util/List;", false));
                    }
                }
                return mn;
            }
        }
    }
}