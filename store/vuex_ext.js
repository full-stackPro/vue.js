import _ from 'lodash';

const mapState = (...args) => {
    const result = {};

    if (args.length === 1) {
        for (const prop of Object.keys(args[0])) {
            result[prop] = {
                get() { return this.$store.state[prop]; },
                set(value) { this.$store.commit(args[0][prop], value); },
            };
        }
    } else {
        for (const prop of Object.keys(args[1])) {
            result[prop] = {
                get() { return this.$store.state[args[0]][prop]; },
                // use module name if exists
                set(value) { this.$store.commit((args[0] ? args[0] + '/' : '') + 'set' + _.startCase(args[1][prop]).replace(" ", ""), value); },
            };
        }
    }

    return result;
}

export {
    mapState
};