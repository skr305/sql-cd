export const generate_id = (head:string) => `${head}-${new Date().getTime()}`;

export default {
    RID: () => generate_id("r"),
    HID: () => generate_id("h"),
    // for the message
    MID: () => generate_id("m"),
    REGCODE: () => generate_id("reg"),
    DID: () => generate_id("d")
}