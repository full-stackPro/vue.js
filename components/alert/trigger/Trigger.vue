<template>
  <div>
    <div class="brdBtm-1"></div>
    <!-- Start - Trigger Name -->
    <div class="titleAlert pull-left mrgTop-20 fullWidth">
      <input
        v-model="name"
        @mouseenter="setActive(true)"
        @mouseleave="setActive(false)"
        placeholder="Enter Trigger Name"
        :class="active?'noPadTop active-input':'noPadTop'"
      >
    </div>
    <!-- End - Trigger Name -->
    <div class="theTitle padLeft-20">
      <p>Fire Trigger When:</p>
    </div>
    <div class="areaMessage">
      <input
        v-model="measure.fieldname"
        v-validate="'required'"
        data-vv-name="measure.fieldname"
        data-vv-as="Number or Cell Reference"
        placeholder="Number or Cell Reference"
      >
      <span
        class="error"
        v-show="errors.has('measure.fieldname')"
      >{{ errors.first('measure.fieldname') }}</span>
    </div>

    <!-- Start - Type section -->
    <div class="areaMessage" style="display:none">
      <label>Type:</label>
      <div>
        <select v-model="measure.type">
          <option disabled>Select Type</option>
          <option value="dummy"></option>
          <option
            :value="type.value"
            v-for="type in fieldSet.types"
            :key="type.value"
            v-text="type.name"
          ></option>
        </select>
      </div>
    </div>
    <!-- End - Type section -->
    <!-- Start - Expression section -->
    <div class="areaMessage">
      <label>Expression:</label>
      <div>
        <select
          v-model="measure.expression"
          v-validate="'required'"
          data-vv-name="measure.expression"
          data-vv-as="Expression"
        >
          <option disabled>Select Expression</option>
          <option
            :value="expression.value"
            v-for="expression in fieldSet.expressions"
            :key="expression.value"
            v-text="expression.name"
          ></option>
        </select>
        <span
          class="error"
          v-show="errors.has('measure.expression')"
        >{{ errors.first('measure.expression') }}</span>
      </div>
    </div>
    <!-- Start - Measure Expression Values Section-->
    <div v-if="measure.expression">
      <!-- Field Value or Min Value -->
      <div class="areaMessage">
        <label>{{valueFieldText}}:</label>
        <input
          v-model="measure.minvalue"
          v-validate="'required'"
          data-vv-name="measure.minvalue"
          data-vv-as="Value"
          @input="validateMaxValue"
        >
        <span
          class="error"
          v-show="errors.has('measure.minvalue')"
        >{{ errors.first('measure.minvalue') }}</span>
      </div>
      <!-- Field Max Value -->
      <div v-if="entriesCount === 2" class="areaMessage">
        <label>Max value:</label>
        <input
          v-model="measure.maxvalue"
          v-validate="'required'"
          data-vv-name="measure.maxvalue"
          data-vv-as="Max Value"
          @input="validateMaxValue"
        >
        <span
          class="error"
          v-show="errors.has('measure.maxvalue')"
        >{{ errors.first('measure.maxvalue') }}</span>
        <span
          v-if="minMaxError"
          class="error"
        >maxValue field must be greater than the minvalue field</span>
      </div>
    </div>
    <!-- End - Measure Expression Values Section-->
    <!-- End - Expression section -->
    <!-- Start - Trigger Description -->
    <div class="areaMessage">
      <textarea v-model="description" placeholder="Trigger Description"></textarea>
    </div>
    <!-- End - Trigger Description -->
    <div class="mainBox padLeft-20">
      <div class="wrapperButton mrgTop-55 clearfix">
        <div class="rightButton pull-left">
          <div class="popularButton">
            <router-link tag="button" :to="'.'">Back</router-link>
          </div>
        </div>
        <div class="leftButton pull-right">
          <div class="popularButton">
            <button @click="saveOrUpdateTrigger">{{actionType}} Trigger</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import { mapState } from "@/store/vuex_ext";
import { mapActions, mapGetters } from "vuex";

import _ from "lodash";
import { Trigger } from "@/models/trigger.model";
import { Measure } from "@/models/measure.model";
import { isValidId } from "@/utils";

export default {
  data() {
    return {
      active: false,
      minMaxError: false
    };
  },
  methods: {
    ...mapActions("trigger", [
      "createTrigger",
      "updateTrigger",
      "fetchTrigger",
      "createMeasure",
      "updateMeasure"
    ]),
    saveOrUpdateTrigger() {
      this.$validator.validateAll().then(result => {
        if (result) {
          if (this.minMaxError) return;
          const triggerId = this.trigger.id;
          if (triggerId) {
            this.updateTrigger({
              id: triggerId,
              name: this.name,
              description: this.description
            });

            if (this.measure.id) {
              this.updateMeasure(this.measure);
            } else {
              this.createMeasure(this.measure);
            }
          } else {
            // Creating new Trigger
            this.createTrigger({
              alertId: this.alert.id,
              name: this.name,
              description: this.description
            }).then(() => this.createMeasure(this.measure));
          }
          this.$router.push(".");
        }
      });
    },
    validateMaxValue() {
      const maxvalue = parseInt(this.measure.maxvalue);
      const minvalue = parseInt(this.measure.minvalue);

      if (maxvalue <= minvalue) {
        this.minMaxError = true;
      } else {
        this.minMaxError = false;
      }
    },
    setActive(state) {
      this.active = state;
    }
  },
  computed: {
    ...mapGetters("trigger", ["getTriggers"]),
    ...mapState("alert", { alert: "alert" }),
    ...mapState("trigger", {
      trigger: "trigger",
      triggersLength: "triggersLength",
      fieldSet: "fieldSet",
      measure: "measure"
    }),
    name: {
      get() {
        return this.trigger.name || `Trigger ${this.triggersLength + 1}`;
      },
      set: name => store.commit("trigger/setName", name)
    },
    description: {
      get() {
        return `Trigger when ${this.measure.fieldname} ${
          this.expressionShortHand
        }`;
      },
      set: description => store.commit("trigger/setDescription", description)
    },
    expressionShortHand: {
      get() {
        const expression = this.measure.expression;
        if (this.entriesCount < 2) {
          return expression + " " + this.measure.minvalue;
        } else {
          return `${expression} ${this.measure.minvalue} and ${
            this.measure.maxvalue
          }`;
        }
      },
      set: description => store.commit("trigger/setDescription", description)
    },
    valueFieldText() {
      return this.measure.expression.entries === 1 ? "Value" : "Min value";
    },
    entriesCount() {
      const expression = this.fieldSet.expressions.find(
        e => e.value === this.measure.expression
      );
      return expression ? expression.entries || 0 : 0;
    },
    actionType() {
      if (this.trigger.id) {
        return "Update";
      } else {
        return "Save";
      }
    }
  },
  mounted() {
    const triggerId = this.$route.params["triggerId"];
    if (isValidId(triggerId)) {
      this.fetchTrigger(triggerId);
    } else {
      this.trigger = new Trigger();
      this.measure = new Measure();
    }
  }
};
</script>