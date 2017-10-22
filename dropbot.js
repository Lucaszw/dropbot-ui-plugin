class DropBotUI extends UIPlugin {
  constructor(elem, focusTracker){
    super(elem, focusTracker, "Experiment Controller");
    this.model = new Backbone.Model();
  }
  listen() {
    this.model.on("all", this.render.bind(this));
    this.onStateMsg("dropbot_plugin", "stats", this.onStatsSet.bind(this));
    this.onStateMsg("dropbot_plugin", "frequency", this.onFrequencySet.bind(this));
    this.onStateMsg("dropbot_plugin", "voltage", this.onVoltageSet.bind(this));
    this.onStateMsg("dropbot_plugin", "capacitance", this.onCapacitanceSet.bind(this));
  }
  onStatsSet(payload){this.model.set("stats", JSON.parse(payload));}
  onFrequencySet(payload){this.model.set("frequency", JSON.parse(payload));}
  onVoltageSet(payload){this.model.set("voltage", JSON.parse(payload));}
  onCapacitanceSet(payload){this.model.set("capacitance", JSON.parse(payload).capacitance);}
  render() {
    this.element.innerHTML = `
      <ul class="list-group">
        <li class="list-group-item">
          <b>Stats</b>: ${this.model.get("stats")}
        </li>
        <li class="list-group-item">
          <b>Voltage</b>: ${this.model.get("voltage")}
        </li>
        <li class="list-group-item">
          <b>Frequency</b>: ${this.model.get("frequency")}
        </li>
        <li class="list-group-item">
          <b>Capacitance</b>: ${this.model.get("capacitance")}
        </li>
      </ul>
    `;
  }
}
window.microdropPlugins.set("DropBotUI", DropBotUI);
