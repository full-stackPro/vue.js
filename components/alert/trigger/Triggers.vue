<template>
  <div>
    <div class="popularButton mrgTop-12 mrgbtm-12 mrgLeft-20">
      <router-link tag="button" :to="'triggers/new'" class="blueStyle-2">Add New Trigger</router-link>
    </div>

    <div class="brdBtm-1"></div>

    <div class="wraper">
      <template v-if="triggers.length">
        <div v-for="trigger in triggers" :key="trigger.id" class="mix clearfix">
          <!-- Start - Trigger List Item Actons Section -->
          <div class="trigger-actions">
            <div class="rightPart pull-right">
              <!-- Edit Action -->
              <router-link
                :to="`triggers/${trigger.id}`"
                tag="i"
                class="fa fa-pencil"
                aria-hidden="true"
              ></router-link>
            </div>
            <!-- Delete Action -->
            <div class="mrgRight-10 rightPart pull-right">
              <i v-on:click="doConfirm(trigger.id)" class="fa fa-trash" aria-hidden="true"></i>
            </div>

            <span class="tag triggered trigger-label">Triggered</span>
          </div>
          <!-- End - Trigger List Item Actons Section -->
          <div class="leftPart pull-left trigger-item">
            <ul>
              <li>
                <p style="display: inline-block">{{trigger.name}}</p>
                <p style="font-size: 12px; color: #6d6d6d">{{trigger.description}}</p>
              </li>
            </ul>
          </div>
        </div>
      </template>
      <div v-else>Not Triggers Added!</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "@/store/vuex_ext";
import { mapGetters, mapActions } from "vuex";

export default {
  methods: {
    ...mapActions("trigger", ["deleteTrigger"]),
    doConfirm(triggerId) {
      if (confirm("Do you want to delete the selected trigger?")) {
        this.deleteTrigger(triggerId);
      }
    }
  },
  computed: {
    ...mapState("alert", { alert: "alert" }),
    ...mapState("trigger", { triggers: "triggers" }),
    ...mapGetters("trigger", ["getTriggers"])
  }
};
</script>