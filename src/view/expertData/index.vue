<template>
  <div>
    <div class="tips">
      <i class="el-icon-warning-outline"></i
      >账号人设/内容形式/粉丝画像/宝宝信息/皮肤信息数据量较少，建议勿选。数据陆续补充中。
    </div>
    <el-form :model="searchForm" label-width="100px">
      <el-form-item label="平台" id="vg-checkbox" :show-message="false">
        <el-checkbox-group v-model="searchForm.selectedPlatform">
          <el-checkbox
            v-for="(item, idx) in platform"
            :key="idx"
            :label="item.id"
            >{{ item.name }}</el-checkbox
          >
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="领域" id="vg-checkbox" :show-message="false">
        <el-checkbox-group v-model="domainAllSelect">
          <template v-for="(item, idx) in domain">
            <el-popover
              :key="idx"
              placement="bottom"
              width="200"
              trigger="hover"
              v-if="item.children"
            >
              <div>
                <el-checkbox-group v-model="domainAllSelect">
                  <el-checkbox
                    :label="item2.id"
                    v-for="(item2, idx2) in item.children"
                    :key="idx2"
                    @change="(val) => domain2Check(val, item, item2)"
                    >{{ item2.name }}
                  </el-checkbox>
                </el-checkbox-group>
              </div>
              <el-checkbox
                slot="reference"
                @change="(val) => domainCheck(val, item)"
                :key="idx"
                :label="item.id"
                >{{ item.name }}
              </el-checkbox>
            </el-popover>
            <el-checkbox
              v-else
              :key="idx"
              :label="item.id"
              @change="(val) => domainCheck(val, item)"
              >{{ item.name }}
            </el-checkbox>
          </template>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="精准匹配" id="vg-checkbox" :show-message="false">
        <el-cascader
          popper-class="skin_pop_cascader"
          v-model="searchForm.accurateCheckList"
          placeholder="精准匹配"
          :props="{ checkStrictly: true }"
          :options="accurateCheckData"
          @change="accurateCheckEvent"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="账号人设" id="vg-checkbox" :show-message="false">
        <el-checkbox-group v-model="searchForm.selectedAccount">
          <el-checkbox
            v-for="(item, idx) in accountSetting"
            :key="idx"
            :label="item.id"
            >{{ item.name }}</el-checkbox
          >
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="内容形式" id="vg-checkbox" :show-message="false">
        <el-checkbox-group v-model="searchForm.selectedContentForm">
          <el-checkbox
            v-for="(item, idx) in contentForm"
            :key="idx"
            :label="item.id"
            >{{ item.name }}</el-checkbox
          >
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="数据要求" id="vg-checkbox" :show-message="false">
        <div class="data_request">
          <div v-popover:fanpop class="data_item">粉丝量</div>
          <div v-popover:interactpop class="data_item">互动数据</div>
          <div v-popover:offerpop class="data_item">报价</div>
        </div>

        <!-- 报价 -->
        <el-popover
          ref="offerpop"
          placement="bottom"
          width="460"
          trigger="click"
          v-model="popShow.showofferpop"
        >
          <div class="interactpop_content pop_content">
            <div
              class="interactpop_content_item"
              v-for="(item2, index) in searchForm.offerData"
              :key="index"
            >
              <div style="margin-right: 10px">报价类型</div>
              <el-select v-model="item2.field" placeholder="请选择">
                <el-option
                  v-for="item in offerOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <div style="margin: auto 10px">值范围</div>
              <input
                type="text"
                class="interactpop_item_inp"
                v-model="item2.min"
              />
              <div>--</div>
              <input
                type="text"
                class="interactpop_item_inp"
                v-model="item2.max"
              />
            </div>
            <el-button class="add_item" type="primary" @click="addInteract(2)"
              >+</el-button
            >
            <div class="inp_wrap_btn" @click="selectBtn">确定</div>
          </div>
        </el-popover>
        <!-- 互动数据 -->
        <el-popover
          ref="interactpop"
          placement="bottom"
          width="460"
          trigger="click"
          v-model="popShow.showinteractpop"
        >
          <div class="interactpop_content pop_content">
            <div
              class="interactpop_content_item"
              v-for="(item2, index) in searchForm.interact"
              :key="index"
            >
              <div style="margin-right: 10px">数据类型</div>
              <el-select v-model="item2.field" placeholder="请选择">
                <el-option
                  v-for="item in interactOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <div style="margin: auto 10px">值范围</div>
              <input
                type="text"
                class="interactpop_item_inp"
                v-model="item2.min"
              />
              <div>--</div>
              <input
                type="text"
                class="interactpop_item_inp"
                v-model="item2.max"
              />
            </div>
            <el-button class="add_item" type="primary" @click="addInteract(1)"
              >+</el-button
            >
            <div class="inp_wrap_btn" @click="selectBtn">确定</div>
          </div>
        </el-popover>
        <!--粉丝量-->
        <el-popover
          ref="fanpop"
          placement="bottom"
          width="150"
          v-model="popShow.showfanpop"
          trigger="click"
        >
          <div class="pop_content">
            <div class="inp_wrap">
              <div class="inp_wrap_label">最低</div>
              <input
                class="inp_wrap_inp"
                type="text"
                v-model="searchForm.fanNUm1"
              />
            </div>
            <div class="inp_wrap" style="margin-top: 10px">
              <div class="inp_wrap_label">最高</div>
              <input
                class="inp_wrap_inp"
                type="text"
                v-model="searchForm.fanNUm2"
              />
            </div>
            <div class="inp_wrap_btn" @click="selectBtn">确定</div>
          </div>
        </el-popover>
      </el-form-item>
      <el-form-item label="粉丝画像" id="vg-checkbox" :show-message="false">
        <div class="data_request">
          <div v-popover:sexpop class="data_item">性别占比</div>
          <div v-popover:agepop class="data_item">年龄段分布</div>
        </div>
        <!-- 年龄段分布 -->
        <el-popover
          ref="agepop"
          placement="bottom"
          width="460"
          v-model="popShow.showagepop"
          trigger="click"
        >
          <div class="interactpop_content pop_content">
            <div
              class="interactpop_content_item"
              v-for="(item2, index) in searchForm.agedistribute"
              :key="index"
            >
              <div style="margin-right: 10px">年龄段</div>
              <el-select v-model="item2.field" placeholder="请选择">
                <el-option
                  v-for="item in ageOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <div style="margin: auto 10px">值范围</div>
              <input
                type="text"
                class="interactpop_item_inp"
                v-model="item2.min"
              />
              <div>--</div>
              <input
                type="text"
                class="interactpop_item_inp"
                v-model="item2.max"
              />
            </div>
            <el-button class="add_item" type="primary" @click="addInteract(3)"
              >+</el-button
            >
            <div class="inp_wrap_btn" @click="selectBtn">确定</div>
          </div>
        </el-popover>
        <!--性别占比-->
        <el-popover
          ref="sexpop"
          placement="bottom"
          width="300"
          v-model="popShow.showsexpop"
          trigger="click"
        >
          <div class="interactpop_content pop_content">
            <div class="interactpop_content_item">
              <div style="margin: auto 10px">男性</div>
              <input
                type="text"
                class="interactpop_item_inp"
                v-model="searchForm.man.num1"
              />
              <div>--</div>
              <input
                type="text"
                class="interactpop_item_inp"
                v-model="searchForm.man.num2"
              />
            </div>
            <div class="interactpop_content_item">
              <div style="margin: auto 10px">女性</div>
              <input
                type="text"
                class="interactpop_item_inp"
                v-model="searchForm.woman.num1"
              />
              <div>--</div>
              <input
                type="text"
                class="interactpop_item_inp"
                v-model="searchForm.woman.num2"
              />
            </div>
            <div class="inp_wrap_btn" @click="selectBtn">确定</div>
          </div>
        </el-popover>
      </el-form-item>
      <el-form-item label="其他信息" id="vg-checkbox" :show-message="false">
        <div class="data_request">
          <div v-popover:babypop class="data_item">宝宝信息</div>
          <!-- <div v-popover:skinpop class="data_item">皮肤信息</div> -->
          <div v-popover:bloggerpop class="data_item">博主所在地</div>
          <div v-popover:skinSpecialtyPop class="data_item">皮肤特质</div>
          <div v-popover:skinColorPop class="data_item">肤色</div>
          <div v-popover:skinSensitivePop class="data_item">敏感肌</div>
        </div>
        <!-- 敏感肌 -->
        <el-popover
          ref="skinSensitivePop"
          placement="bottom"
          width="300"
          trigger="click"
          v-model="popShow.showskinSensitive"
        >
          <div class="interactpop_content pop_content">
            <el-radio-group v-model="searchForm.skinSensitive">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
              <el-radio label="null">未选择</el-radio>
            </el-radio-group>
            <div class="inp_wrap_btn" @click="selectBtn">确定</div>
          </div>
        </el-popover>
        <!-- 肤色 -->
        <el-popover
          ref="skinColorPop"
          placement="bottom"
          width="300"
          trigger="click"
          v-model="popShow.showskinColor"
        >
          <div class="interactpop_content pop_content">
            <el-radio-group v-model="searchForm.skinColor">
              <el-radio label="白皮">白皮</el-radio>
              <el-radio label="黄皮">黄皮</el-radio>
              <el-radio label="黑皮">黑皮</el-radio>
              <el-radio label="黄黑皮">黄黑皮</el-radio>
              <el-radio label="橄榄皮">橄榄皮</el-radio>
              <el-radio label="null">未选择</el-radio>
            </el-radio-group>
            <div class="inp_wrap_btn" @click="selectBtn">确定</div>
          </div>
        </el-popover>
        <!-- 皮肤特质 -->
        <el-popover
          ref="skinSpecialtyPop"
          placement="bottom"
          width="300"
          trigger="click"
          v-model="popShow.showskinSpecialty"
        >
          <div class="interactpop_content pop_content">
            <el-radio-group v-model="searchForm.skinSpecialty">
              <el-radio label="干皮">干皮</el-radio>
              <el-radio label="油皮">油皮</el-radio>
              <el-radio label="混合皮">混合皮</el-radio>
              <el-radio label="null">未选择</el-radio>
            </el-radio-group>
            <div class="inp_wrap_btn" @click="selectBtn">确定</div>
          </div>
        </el-popover>
        <!-- 宝宝信息 -->
        <el-popover
          ref="babypop"
          placement="bottom"
          width="460"
          trigger="click"
          v-model="popShow.showbabypop"
        >
          <div class="interactpop_content pop_content">
            <div class="interactpop_content_item">
              <div style="margin-right: 10px">性别</div>
              <el-select
                v-model="searchForm.babyData.field"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in sexOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <div style="margin: auto 10px">值范围</div>
              <input
                type="text"
                class="interactpop_item_inp"
                v-model="searchForm.babyData.min"
              />
              <div>--</div>
              <input
                type="text"
                class="interactpop_item_inp"
                v-model="searchForm.babyData.max"
              />
            </div>
            <div class="inp_wrap_btn" @click="selectBtn">确定</div>
          </div>
        </el-popover>
        <!-- 皮肤信息 -->
        <el-popover
          ref="skinpop"
          placement="bottom"
          width="200"
          trigger="click"
          v-model="popShow.showskinpop"
        >
          <div class="interactpop_content pop_content">
            <el-cascader
              popper-class="skin_pop_cascader"
              v-model="searchForm.skinData"
              placeholder="试试搜索：指南"
              :options="skinOptions"
              :props="{ multiple: true }"
            ></el-cascader>
            <div class="inp_wrap_btn" @click="selectBtn">确定</div>
          </div>
        </el-popover>
        <!--博主所在地-->
        <el-popover
          ref="bloggerpop"
          placement="bottom"
          width="290"
          trigger="click"
          v-model="popShow.showbloggerpop"
        >
          <div class="pop_content">
            <div class="inp_wrap">
              <div class="inp_wrap_label flex_label">最近ip</div>
              <div>
                <input type="text" v-model="searchForm.selectIpArea" />
                <!-- <el-cascader
                  size="mini"
                  :options="areaOptions"
                  v-model="searchForm.ipArea"
                  @change="ipChange"
                >
                </el-cascader> -->
              </div>
            </div>
            <div class="inp_wrap" style="margin-top: 10px">
              <div class="inp_wrap_label flex_label">常驻地址</div>
              <div>
                <input type="text" v-model="searchForm.selectResidentArea" />
                <!-- <el-cascader
                  size="mini"
                  :options="areaOptions"
                  :props="{ checkStrictly: true }"
                  v-model="searchForm.residentArea"
                  @change="residentChange"
                >
                </el-cascader> -->
              </div>
            </div>
            <div class="inp_wrap_btn" @click="selectBtn">确定</div>
          </div>
        </el-popover>
      </el-form-item>
      <el-form-item label="辅助条件" id="vg-checkbox" :show-message="false">
        <div class="data_request contact_wrap">
          <el-checkbox v-model="searchForm.is_contact">有联系方式</el-checkbox>
          <el-checkbox v-model="searchForm.is_jianlian">已建联</el-checkbox>
          <!-- <el-radio-group v-model="searchForm.contact">
            <el-radio :label="1">有联系方式</el-radio>
            <el-radio :label="2">已建联</el-radio>
          </el-radio-group> -->
        </div>
      </el-form-item>
      <el-form-item label="辅助搜索" id="vg-checkbox" :show-message="false">
        <div class="data_request contact_wrap">
          <el-input
            v-model="searchForm.assistSearch"
            placeholder="请输入内容"
            class="assist_search_inp"
          ></el-input>
          <el-button @click="resetData">清空</el-button>
          <el-button type="primary" @click="searchBtn(1)">确定</el-button>
          <el-button @click="uploadData" type="primary" icon="el-icon-download"
            >导出</el-button
          >
        </div>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <el-popover ref="popover" placement="right" width="200" trigger="click">
      <el-tree
        :data="treeData"
        show-checkbox
        node-key="id"
        :default-checked-keys="checkedKeys"
        :props="defaultProps"
        @check="selectTree"
      >
      </el-tree>
    </el-popover>
    <!--    <el-button v-popover:popover>修改</el-button> -->
    <!-- <el-button @click="uploadData" type="primary">导出</el-button> -->
    <!-- <el-button @click="printData">打印</el-button> -->
    <!--//如果需要做控制表格列的展示效果可用v-if加上面注释掉的隐藏功能
      <el-table-column
        align="center"
        prop="address"
        label="地址"
        v-if="checkedKeys.includes('address')"
      >
      </el-table-column> -->
    <el-table
      :data="expertTable"
      border
      style="width: 100%"
      id="tableData2"
      v-loading="isLoading"
    >
      <el-table-column align="center" prop="id" width="100" label="ID">
      </el-table-column>
      <el-table-column
        align="center"
        prop="avatar_url"
        width="100"
        label="头像"
      >
        <template slot-scope="scope">
          <img width="50px" :src="scope.row.avatar_url" alt="" />
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="nickname"
        width="100"
        show-overflow-tooltip
        label="昵称"
      >
      </el-table-column>
      <el-table-column align="center" prop="type" width="100" label="平台">
        <template slot-scope="{ row }">
          <div>
            {{
              row.type == 1
                ? "小红书"
                : row.type == 2
                ? "抖音"
                : row.type == 3
                ? "微博"
                : row.type == 4
                ? "淘宝逛逛"
                : "--"
            }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        width="100"
        align="center"
        prop="account_id"
        label="平台ID"
        v-if="checkedKeys.includes('address')"
      >
      </el-table-column>
      <el-table-column
        width="150"
        align="center"
        prop="link"
        label="主页链接"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <a :href="row.link" target="_blank" rel="noopener noreferrer">{{
            row.link
          }}</a>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="sex" width="100" label="性别">
        <template slot-scope="{ row }">
          <div>
            {{ row.sex == 1 ? "男" : "女" }}
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" width="200" prop="domain" label="领域">
        <template slot-scope="scope">
          <div>
            <el-popover
              ref="editDomainPop"
              placement="top"
              width="700"
              trigger="click"
              v-model="scope.row.editPopDomainShow"
            >
              <div id="vg-checkbox2">
                <el-checkbox-group v-model="editDomainAllSelect">
                  <template v-for="(item, idx) in domain">
                    <el-popover
                      :key="idx"
                      placement="bottom"
                      width="200"
                      trigger="hover"
                      v-if="item.children"
                    >
                      <div>
                        <el-checkbox-group v-model="editDomainAllSelect">
                          <el-checkbox
                            :label="item2.id"
                            v-for="(item2, idx2) in item.children"
                            :key="idx2"
                            @change="(val) => domain2Check(val, item, item2, 2)"
                            >{{ item2.name }}
                          </el-checkbox>
                        </el-checkbox-group>
                      </div>
                      <el-checkbox
                        slot="reference"
                        @change="(val) => domainCheck(val, item, 2)"
                        :key="idx"
                        :label="item.id"
                        >{{ item.name }}
                      </el-checkbox>
                    </el-popover>
                    <el-checkbox
                      v-else
                      :key="idx"
                      :label="item.id"
                      @change="(val) => domainCheck(val, item, 2)"
                      >{{ item.name }}
                    </el-checkbox>
                  </template>
                </el-checkbox-group>
              </div>
              <div slot="reference" class="data_item">
                {{ scope.row.domain || "--" }}
              </div>
              <div style="text-align: right">
                <el-button
                  type="primary"
                  size="mini"
                  @click="editTablePop(scope.$index, scope.row.id, 1)"
                  >确定</el-button
                >
              </div>
            </el-popover>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="persona"
        width="100"
        label="账号人设"
      >
        <template slot-scope="scope">
          <div>
            <el-popover
              ref="editAccountSetPop"
              placement="top"
              width="700"
              trigger="click"
              v-model="scope.row.editAccountSetShow"
            >
              <div id="vg-checkbox2">
                <el-checkbox-group v-model="editAccountSetting">
                  <el-checkbox
                    v-for="(item, idx) in accountSetting"
                    :key="idx"
                    :label="item.id"
                    >{{ item.name }}</el-checkbox
                  >
                </el-checkbox-group>
              </div>
              <div slot="reference" class="data_item">
                {{ scope.row.persona || "--" }}
              </div>
              <div style="text-align: right">
                <el-button
                  type="primary"
                  size="mini"
                  @click="editTablePop(scope.$index, scope.row.id, 2)"
                  >确定</el-button
                >
              </div>
            </el-popover>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="content_type"
        width="100"
        label="内容形式"
      >
        <template slot-scope="scope">
          <div>
            <el-popover
              ref="editContentFormPop"
              placement="top"
              width="700"
              trigger="click"
              v-model="scope.row.editContentFormShow"
            >
              <div id="vg-checkbox2">
                <el-checkbox-group v-model="editContentForm">
                  <el-checkbox
                    v-for="(item, idx) in contentForm"
                    :key="idx"
                    :label="item.id"
                    >{{ item.name }}</el-checkbox
                  >
                </el-checkbox-group>
              </div>
              <div slot="reference" class="data_item">
                {{ scope.row.content_type || "--" }}
              </div>
              <div style="text-align: right">
                <el-button
                  type="primary"
                  size="mini"
                  @click="editTablePop(scope.$index, scope.row.id, 3)"
                  >确定</el-button
                >
              </div>
            </el-popover>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="110"
        prop="bbpprice"
        label="图文报备报价"
      >
        <template slot-scope="scope">
          <div>
            <el-popover
              ref="editBbppricePop"
              placement="top"
              width="300"
              trigger="click"
              v-model="scope.row.editBbppriceShow"
            >
              <div id="vg-checkbox2">
                最新报价：<input type="text" v-model="editBbppriceInp" />
              </div>
              <div slot="reference" class="data_item">
                {{ scope.row.bbpprice || "--" }}
              </div>
              <div style="text-align: right">
                <el-button
                  style="margin-top: 10px"
                  type="primary"
                  size="mini"
                  @click="editTablePop(scope.$index, scope.row.id, 4)"
                  >确定</el-button
                >
              </div>
            </el-popover>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        width="120"
        align="center"
        prop="article_price"
        label="图文非报备报价"
      >
        <template slot-scope="scope">
          <div>
            <el-popover
              ref="editArticlePricePop"
              placement="top"
              width="300"
              trigger="click"
              v-model="scope.row.editArticlePriceShow"
            >
              <div id="vg-checkbox2">
                最新报价：<input type="text" v-model="editArticlePriceInp" />
              </div>
              <div slot="reference" class="data_item">
                {{ scope.row.article_price || "--" }}
              </div>
              <div style="text-align: right">
                <el-button
                  style="margin-top: 10px"
                  type="primary"
                  size="mini"
                  @click="editTablePop(scope.$index, scope.row.id, 5)"
                  >确定</el-button
                >
              </div>
            </el-popover>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        width="120"
        align="center"
        prop="article_collect_price"
        label="图文非报备合集报价"
      >
        <template slot-scope="scope">
          <div>
            <el-popover
              ref="editArticleCollectPricePop"
              placement="top"
              width="300"
              trigger="click"
              v-model="scope.row.editArticleCollectPriceShow"
            >
              <div id="vg-checkbox2">
                最新报价：<input
                  type="text"
                  v-model="editArticleCollectPriceInp"
                />
              </div>
              <div slot="reference" class="data_item">
                {{ scope.row.article_collect_price || "--" }}
              </div>
              <div style="text-align: right">
                <el-button
                  style="margin-top: 10px"
                  type="primary"
                  size="mini"
                  @click="editTablePop(scope.$index, scope.row.id, 6)"
                  >确定</el-button
                >
              </div>
            </el-popover>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="bbvprice"
        width="110"
        label="视频报备报价"
      >
        <template slot-scope="scope">
          <div>
            <el-popover
              ref="editBbvpricePop"
              placement="top"
              width="300"
              trigger="click"
              v-model="scope.row.editBbvpriceShow"
            >
              <div id="vg-checkbox2">
                最新报价：<input type="text" v-model="editBbvpriceInp" />
              </div>
              <div slot="reference" class="data_item">
                {{ scope.row.bbvprice || "--" }}
              </div>
              <div style="text-align: right">
                <el-button
                  style="margin-top: 10px"
                  type="primary"
                  size="mini"
                  @click="editTablePop(scope.$index, scope.row.id, 7)"
                  >确定</el-button
                >
              </div>
            </el-popover>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="video_price"
        width="120"
        label="视频非报备报价"
      >
        <template slot-scope="scope">
          <div>
            <el-popover
              ref="editVideoPricePop"
              placement="top"
              width="300"
              trigger="click"
              v-model="scope.row.editVideoPriceShow"
            >
              <div id="vg-checkbox2">
                最新报价：<input type="text" v-model="editVideoPriceInp" />
              </div>
              <div slot="reference" class="data_item">
                {{ scope.row.video_price || "--" }}
              </div>
              <div style="text-align: right">
                <el-button
                  style="margin-top: 10px"
                  type="primary"
                  size="mini"
                  @click="editTablePop(scope.$index, scope.row.id, 8)"
                  >确定</el-button
                >
              </div>
            </el-popover>
          </div>
        </template> </el-table-column
      ><el-table-column
        width="120"
        align="center"
        prop="video_collect_price"
        label="视频非报备合集报价"
      >
        <template slot-scope="scope">
          <div>
            <el-popover
              ref="editVideoPricePop"
              placement="top"
              width="300"
              trigger="click"
              v-model="scope.row.editVideoCollectPriceShow"
            >
              <div id="vg-checkbox2">
                最新报价：<input
                  type="text"
                  v-model="editVideoCollectPriceInp"
                />
              </div>
              <div slot="reference" class="data_item">
                {{ scope.row.video_collect_price || "--" }}
              </div>
              <div style="text-align: right">
                <el-button
                  style="margin-top: 10px"
                  type="primary"
                  size="mini"
                  @click="editTablePop(scope.$index, scope.row.id, 9)"
                  >确定</el-button
                >
              </div>
            </el-popover>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="rebate" width="100" label="返点">
        <template slot-scope="scope">
          <div>
            <el-popover
              ref="editRebatePop"
              placement="top"
              width="300"
              trigger="click"
              v-model="scope.row.editRebateShow"
            >
              <div id="vg-checkbox2">
                最新报价：<input type="text" v-model="editRebateInp" />
              </div>
              <div slot="reference" class="data_item">
                {{ scope.row.rebate || "--" }}
              </div>
              <div style="text-align: right">
                <el-button
                  style="margin-top: 10px"
                  type="primary"
                  size="mini"
                  @click="editTablePop(scope.$index, scope.row.id, 10)"
                  >确定</el-button
                >
              </div>
            </el-popover>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="wechat_code"
        width="120"
        label="微信号"
      >
      </el-table-column>
      <el-table-column align="center" prop="phone" width="120" label="手机号">
      </el-table-column>
      <el-table-column
        align="center"
        prop="is_tandian"
        width="100"
        label="是否可探店"
      >
        <template slot-scope="{ row }">
          <div>
            {{ row.is_tandian == 1 ? "是" : "否" }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="baby_info"
        label="宝宝信息"
        width="100"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="skin_type"
        label="皮肤特质"
        width="100"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="skin_color"
        label="肤色"
        width="100"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="is_sensitive"
        label="敏感肌"
        width="100"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <div>
            {{ scope.row.is_sensitive == 1 ? "是" : "否" }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        width="100"
        align="center"
        prop="last_release_date"
        label="最近发布笔记时间"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="fans"
        label="粉丝数"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column align="center" prop="interaction" label="赞藏数">
      </el-table-column>

      <el-table-column
        width="100"
        align="center"
        prop="viewMean"
        label="阅读平均数"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        width="100"
        align="center"
        prop="likeMean"
        label="点赞平均数"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        width="100"
        align="center"
        prop="collectMean"
        label="收藏平均数"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        width="100"
        align="center"
        prop="cmtMean"
        label="评论平均数"
        v-if="checkedKeys.includes('address')"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        width="100"
        align="center"
        prop="viewMid"
        label="阅读中位数"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        width="100"
        align="center"
        prop="likeMid"
        label="点赞中位数"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        width="100"
        align="center"
        prop="collectMid"
        label="收藏中位数"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        width="100"
        align="center"
        prop="cmtMid"
        label="评论中位数"
        v-if="checkedKeys.includes('address')"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        width="100"
        align="center"
        prop="video_complete_rate"
        label="视频完播率"
        show-overflow-tooltip
      >
      </el-table-column>

      <el-table-column
        align="center"
        prop="last_at"
        width="100"
        label="最新报价时间"
      >
      </el-table-column>
      <el-table-column align="center" prop="beizhu" label="其余备注">
      </el-table-column>

      <el-table-column align="center" prop="bb_p_cpe" label="图文cpe报备">
      </el-table-column>
      <el-table-column align="center" prop="not_bb_p_cpe" label="图文cpe非报备">
      </el-table-column>
      <el-table-column align="center" prop="bb_v_cpe" label="视频cpe报备">
      </el-table-column>
      <el-table-column align="center" prop="not_bb_v_cpe" label="视频cpe非报备">
      </el-table-column>
      <el-table-column align="center" prop="bb_p_cpm" label="图文cpm报备">
      </el-table-column>
      <el-table-column align="center" prop="not_bb_p_cpm" label="图文cpm非报备">
      </el-table-column>
      <el-table-column align="center" prop="bb_v_cpm" label="视频cpm报备">
      </el-table-column>
      <el-table-column align="center" prop="not_bb_v_cpm" label="视频cpm非报备">
      </el-table-column>
      <el-table-column align="center" prop="last_location" label="最近ip地址">
      </el-table-column>
      <el-table-column align="center" prop="location" label="常驻地">
      </el-table-column>
      <el-table-column
        align="center"
        prop="fans_sex"
        width="200"
        show-overflow-tooltip
        label="粉丝性别分布"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="fans_areas"
        width="200"
        show-overflow-tooltip
        label="粉丝地域分布"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="fans_ages"
        width="200"
        show-overflow-tooltip
        label="粉丝年龄分布"
      >
      </el-table-column>
      <el-table-column align="center" prop="is_mcn" label="签约mcn">
        <template slot-scope="{ row }">
          <div>
            {{ row.is_mcn == 1 ? "是" : "否" }}
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="mcn_name" label="mcn名称">
      </el-table-column>
      <el-table-column align="center" label="关注17.5公众号">
        <template slot-scope="{ row }">
          <div>
            {{ row.uid > 0 ? "是" : "否" }}
          </div>
        </template>
      </el-table-column>
      <!-- 注册17.5小程序和添加企业微信暂时没有字段  没有添加的 -->
      <el-table-column align="center" prop="" label="注册17.5小程序">
      </el-table-column>
      <el-table-column align="center" prop="" label="添加企业微信">
      </el-table-column>
      <el-table-column
        align="center"
        prop="source"
        label="来源"
        v-if="checkedKeys.includes('address')"
      >
        <template slot-scope="{ row }">
          <div>
            {{
              row.source == 1
                ? "公众号录入"
                : row.source == 2
                ? "莓果库"
                : row.source == 3
                ? "资源库"
                : "--"
            }}
          </div>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="currentPage"
      :limit.sync="pageSize"
      :pageSizes.sync="pageSizes"
      @pagination="searchBtn"
    />
  </div>
</template>

<script>
import { searchData, editTable } from "@/api/resourceInte";
import {  dataPoint } from "@/api/dataPoint";
import Pagination from "@/components/pagination";
import { uploadElExcel } from "@/utils/util";
import { regionData, CodeToText } from "element-china-area-data";
import {
  contentForm,
  platform,
  domain,
  accountSetting,
  skinOptions,
  interactOptions,
  offerOptions,
  ageOptions,
  excelCommons,
  accurateCheckData,
} from "./listData";
export default {
  name: "ProjectOneIndex",
  components: {
    Pagination,
  },
  data() {
    return {
      pageSizes: [10, 25, 50, 100, 200, 500, 1000],
      isLoading: false,
      currentPage: 1, //当前页数
      pageSize: 10, //每页显示条数
      total: 10, //总条数
      domainAllSelect: [], //筛选领域回显
      editDomainAllSelect: [], //修改领域
      popShow: {
        showfanpop: false,
        showinteractpop: false,
        showofferpop: false,
        showagepop: false,
        showsexpop: false,
        showbabypop: false,
        showskinpop: false,
        showbloggerpop: false,
        showskinSensitive: false, //是否敏感肌
        showskinColor: false, //肤色
        showskinSpecialty: false,
      },
      /* 表单修改领域提交的数据 */
      editDomain: {
        selectedEditDomain: [], //领域
      },

      /* 修改返点 */
      editRebateInp: "",
      /* 修改视频非报备合集报价 */
      editVideoCollectPriceInp: "",
      /* 修改视频非报备报价 */
      editVideoPriceInp: "",
      /* 修改视频报备报价 */
      editBbvpriceInp: "",
      /* 修改图文非报备报价合集  */
      editArticleCollectPriceInp: "",
      /* 修改图文非报备报价 */
      editArticlePriceInp: "",
      /* 修改图文报备报价 */
      editBbppriceInp: "",
      //表单修改账号人设的数据
      editAccountSetting: [],
      //表单内容形式
      editContentForm: [],
      searchForm: {
        skinSensitive: "null", //是否敏感肌
        skinColor: "null", //肤色
        skinSpecialty: "null", //皮肤特质
        is_contact: false, //是否有联系方式
        is_jianlian: false, //是否建联
        accurateCheckList: [], //精准匹配
        assistSearch: null, //辅助搜索内容
        contact: null, //联系方式
        selectResidentArea: null, //选中常驻地址
        residentArea: [], //常驻地址代号
        selectIpArea: null, //选中的ip地址
        ipArea: [], //ip地址代号
        skinData: [], //皮肤数据
        selectedPlatform: [],
        selectedDomain: [], //领域
        selectedAccount: [], //账号人设
        selectedContentForm: [], //内容形式
        fanNUm1: null, //粉丝量最低
        fanNUm2: null, //粉丝量最高
        /* 互动数据 */
        interact: [
          {
            field: "",
            min: "",
            max: "",
          },
        ],
        /* 报价数据 */
        offerData: [
          {
            field: "",
            min: "",
            max: "",
          },
        ],
        /* 年龄数据 */
        agedistribute: [
          {
            field: "",
            min: "",
            max: "",
          },
        ],
        /* 性别占比男 */
        man: {
          num1: null,
          num2: null,
        },
        /* 性别占比女 */
        woman: {
          num1: null,
          num2: null,
        },
        /* 宝宝data */
        babyData: {
          field: "",
          min: "",
          max: "",
        },
      },
      /* 平台选择 */
      platform: platform,
      /* 领域选择 */
      domain: domain,
      /* 账号人设选择 */
      accountSetting: accountSetting,
      /* 内容形式 */
      contentForm: contentForm,
      /* 互动数据类型 */
      interactOptions: interactOptions,
      /* 报价类型 */
      offerOptions: offerOptions,
      /* 年龄段分布 */
      ageOptions: ageOptions,
      /* 宝宝信息的性别选择 */
      sexOptions: [
        {
          value: "男",
          label: "男性",
        },
        {
          value: "女",
          label: "女性",
        },
      ],
      /* 皮肤选择 */
      skinOptions: skinOptions,
      accurateCheckData: accurateCheckData,
      //地址选择器
      areaOptions: regionData,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      expertTable: [],
      checkedKeys: ["date", "name", "address"], //选中的树结构
      treeData: [
        {
          id: "date",
          label: "日期",
        },
        {
          id: "name",
          label: "名字",
        },
        {
          id: "address",
          label: "地址",
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  watch: {
    expertTable: {
      handler() {
        this.editDomainAllSelect = [];
        this.editDomain.selectedEditDomain = [];
        this.editAccountSetting = [];
        this.editContentForm = [];
        this.editBbppriceInp = [];
        this.editArticlePriceInp = [];
        this.editArticleCollectPriceInp = [];
        this.editBbvpriceInp = [];
        this.editVideoPriceInp = [];
        this.editVideoCollectPriceInp = [];
        this.editRebateInp = [];
      },
      deep: true,
    },
  },
  mounted() {
    this.searchBtn();
  },

  methods: {
    accurateCheckEvent(value) {
      console.log(value);
    },
    /* 修改领域 */
    editTablePop(trIndex, id, type) {
      let newSelectedDomain = this.editDomain.selectedEditDomain.map((item) => {
        /* 这一步是因为这里是对象数组避免修改原数组  回显的时候需要做出额外拼接 */
        let obj = { ...item };
        if (obj.ppid && obj.ppid.length > 0) {
          obj.ppid = obj.ppid.map((item2) => {
            if (item2.includes("其他")) {
              item2 = "其他";
            }
            return item2;
          });
        }
        return obj;
      });
      let obj = {
        id,
      };
      //type 1为修改领域 2为账号人设 3为内容形式
      switch (type) {
        case 1:
          obj.domain = newSelectedDomain;
          break;
        case 2:
          obj.persona = this.editAccountSetting;
          break;
        case 3:
          obj.content_type = this.editContentForm;
          break;
        case 4:
          obj.bbpprice = this.editBbppriceInp;
          break;
        case 5:
          obj.article_price = this.editArticlePriceInp;
          break;
        case 6:
          obj.article_collect_price = this.editArticleCollectPriceInp;
          break;
        case 7:
          obj.bbvprice = this.editBbvpriceInp;
          break;
        case 8:
          obj.video_price = this.editVideoPriceInp;
          break;
        case 9:
          obj.video_collect_price = this.editVideoCollectPriceInp;
          break;
        case 10:
          obj.rebate = this.editRebateInp;
          break;
      }

      editTable(obj)
        .then((res) => {
          if (res.code == 200) {
            this.expertTable[trIndex].editContentFormShow = false;
            this.expertTable[trIndex].editAccountSetShow = false;
            this.expertTable[trIndex].editPopDomainShow = false;
            this.expertTable[trIndex].editBbppriceShow = false;
            this.expertTable[trIndex].editArticlePriceShow = false;
            this.expertTable[trIndex].editArticleCollectPriceShow = false;
            this.expertTable[trIndex].editBbvpriceShow = false;
            this.expertTable[trIndex].editVideoPriceShow = false;
            this.expertTable[trIndex].editVideoCollectPriceShow = false;
            this.expertTable[trIndex].editRebateShow = false;
            this.searchBtn();
          } else {
            this.$message.error(res.message);
            console.error(res.msg);
          }
        })
        .catch((err) => {
          this.$message.error(err);
          console.error(err);
        });
    },
    /* 表格中修改数据 */
    editTablePop1(trIndex) {
      console.log("trIndex: ", trIndex);
      /* 修改提交领域数据  区分其他 */
      let newSelectedDomain = this.editDomain.selectedEditDomain.map((item) => {
        /* 这一步是因为这里是对象数组避免修改原数组  回显的时候需要做出额外拼接 */
        let obj = { ...item };
        if (obj.ppid && obj.ppid.length > 0) {
          obj.ppid = obj.ppid.map((item2) => {
            if (item2.includes("其他")) {
              item2 = "其他";
            }
            return item2;
          });
        }
        return obj;
      });
      console.log(newSelectedDomain);
      console.log(
        "this.editDomain.selectedEditDomain: ",
        this.editDomain.selectedEditDomain
      );

      /* this.expertTable[trIndex].editPopDomainShow=false
      this.expertTable[trIndex].editAccountSetting=false
      this.expertTable[trIndex].editContentForm=false */
    },
    /* 筛选领域的2级菜单 */
    domain2Check(value, item, item2, type) {
      let str1 = "";
      let str2 = "";
      let str3 = "";
      /*  console.log("str: ", this[`${str1}`][`${str2}`]); */
      /* type==2是修改  */
      if (type == 2) {
        str1 = "editDomain";
        str2 = "selectedEditDomain";
        str3 = "editDomainAllSelect";
      } else {
        str1 = "searchForm";
        str2 = "selectedDomain";
        str3 = "domainAllSelect";
      }
      /* value为true是选中 */
      if (value) {
        let arr = [...this[`${str1}`][`${str2}`]];
        let status = true;
        arr.map((it) => {
          if (it.pid == item.id) {
            if (it.ppid && it.ppid.length > 0) {
              it.ppid.push(item2.id);
            } else {
              it.ppid = [item2.id];
            }
            status = false;
          }
          return it;
        });
        if (status) {
          this[`${str3}`] = [...this[`${str3}`], item.id];
          let obj = {
            pid: item.id,
            ppid: [item2.id],
          };
          arr.push(obj);
        }
        this[`${str1}`][`${str2}`] = arr;
      } else {
        let arr = this[`${str1}`][`${str2}`];
        arr.map((it) => {
          if (it.pid == item.id) {
            it.ppid = it.ppid.filter((itt) => {
              return itt != item2.id;
            });
            if (it.ppid.length == 0) {
              let status = this[`${str3}`].some((it2) => {
                return it2 == it.pid;
              });
              if (!status) {
                this[`${str3}`] = [...this[`${str3}`], it.pid];
              }
              delete it.ppid;
            }
          }
          return it;
        });
        this[`${str1}`][`${str2}`] = arr;
      }
      console.log(
        "this.editDomain.selectedEditDomain: ",
        this.editDomain.selectedEditDomain
      );
      console.log(
        " this.searchForm.selectedDomain: ",
        this.searchForm.selectedDomain
      );
    },
    /* 筛选领域的1级菜单 */
    domainCheck(value, item, type) {
      let str1 = "";
      let str2 = "";
      let str3 = "";
      /*  console.log("str: ", this[`${str1}`][`${str2}`]); */
      /* type==2是修改  */
      if (type == 2) {
        str1 = "editDomain";
        str2 = "selectedEditDomain";
        str3 = "editDomainAllSelect";
      } else {
        str1 = "searchForm";
        str2 = "selectedDomain";
        str3 = "domainAllSelect";
      }
      /* value为true是添加false是取消*/
      if (value) {
        let arr = [...this[`${str1}`][`${str2}`]];
        let status = true;
        arr.forEach((it) => {
          if (it.pid == item.id) {
            status = false;
          }
        });
        if (status) {
          let obj = {
            pid: item.id,
          };
          arr.push(obj);
        }
        this[`${str1}`][`${str2}`] = arr;
      } else {
        /* 判断当有子集存在父级不可取消 */
        this[`${str1}`][`${str2}`].forEach((it) => {
          if (it.ppid && it.pid == item.id) {
            this[`${str3}`].push(item.id);
          }
        });
        /* 过滤取消 */
        let arr = this[`${str1}`][`${str2}`].filter((it) => {
          if (!it.ppid) {
            return it.pid != item.id;
          } else {
            return it;
          }
        });
        this[`${str1}`][`${str2}`] = arr;
      }
    },
    printData() {
      this.printExcel("tableData");
    },
    /* 打印 */
    printExcel(id) {
      // 空页面
      let printStr =
        "<html><head><meta http-equiv='Content-Type' content='text/html; charset=utf-8'></head>";
      // 定义element-ui table组件的样式
      const tabStyle = `<style>
                table{width:100%;display:table-cell!important;box-sizing:border-box;}
                .el-table__header,.el-table__body,.el-table__footer{width:100%!important;border-collapse: collapse;text-align:center;}
                table,table tr th, table tr td { border:1px solid #ddd;color:#606266;word-wrap:break-word}
                table tr th,table tr td{padding:4mm 0mm;word-wrap:break-word }
                .el-table__body, tr td .cell{width:100%!important}
                .el-table th.gutter{display: none;}
                .el-table colgroup.gutter{display: none;}
                .el-table th.gutter{display: table-cell!important;}
                </style><body>`;
      let content = "";
      // 获取名为传入id的 dom元素内的内容
      console.log(id);
      let str = document.getElementById(id).innerHTML;
      // 拼接空页面+style样式+dom内容
      content = content + str;
      printStr = printStr + tabStyle + content + "</body></html>";
      // 打开新页面
      let pwin = window.open("_blank");
      // 将内容赋值到新页面
      pwin.document.write(printStr);
      pwin.document.close();
      // 聚焦-不加focuse，在某些情况下，打印页面会有问题。
      pwin.focus();
      // 使用setTimeout，等页面dom元素渲染完成后再打印。
      setTimeout(() => {
        pwin.print(); // 打印功能。 例如 window.print() 直接打印当前整个页面。
        pwin.close(); // 关闭 打印创建的当前页面
      }, 500);
    },
    /* 前端导出表格 */
    uploadData() {
      dataPoint({ event_id: "K0101", times: 1 });
      let commons = [];
      /*
    //可配合筛选进行筛选固定列进行导出  
     this.checkedKeys.forEach((item) => {
        let title = "";
        switch (item) {
          case "date":
            title = "日期";
            break;
        }
        let obj = {
          title,
          key: item,
          type: "text",
        };
        commons.push(obj);
      }); */
      let excekData = this.expertTable.map((res) => {
        let obj = { ...res };
        Object.keys(obj).forEach((res2) => {
          if (obj[res2] === null) {
            obj[res2] = "";
          }
        });
        obj.is_official_accounts = obj.uid > 0 ? "是" : "否";
        obj.sex = obj.sex == 1 ? "男" : "女";
        obj.is_tandian = obj.is_tandian == 1 ? "是" : "否";
        obj.is_sensitive = obj.is_sensitive == 1 ? "是" : "否";
        obj.is_mcn = obj.is_mcn == 1 ? "是" : "否";
        obj.source =
          obj.source == 1
            ? "公众号录入"
            : obj.source == 2
            ? "莓果库"
            : obj.source == 3
            ? "资源库"
            : "--";
        obj.type =
          obj.type == 1
            ? "小红书"
            : obj.type == 2
            ? "抖音"
            : obj.type == 3
            ? "微博"
            : obj.type == 4
            ? "淘宝逛逛"
            : "--";
        obj.is_mini = "";
        obj.is_enterprise_mini = "";
        return obj;
      });
      commons = excelCommons;
      /* 导出表格的时候对npm包做了修改进行实现兼容  部分commons是img类型但是是text空的情况 */
      uploadElExcel(commons, excekData);
    },
    /* 树结构 */
    selectTree(data, selectData) {
      this.checkedKeys = selectData.checkedKeys;
    },
    selectBtn() {
      this.popShow = {
        showfanpop: false,
        showinteractpop: false,
        showofferpop: false,
        showagepop: false,
        showsexpop: false,
        showbabypop: false,
        showskinpop: false,
        showbloggerpop: false,
        showskinSensitive: false,
        showskinColor: false,
        showskinSpecialty: false,
      };
    },
    /* 格式化提交数据 */
    subFormatData() {
      let {
        selectedPlatform, //平台
        selectedAccount, //账号人设
        selectedContentForm, //内容形式
        fanNUm1, //粉丝量最低
        fanNUm2, //粉丝量最大
        interact, //互动数据
        offerData, //报价
        man, //性别男性占比
        woman, //性别女性占比
        agedistribute, //年龄段分布
        babyData, //宝宝信息
        is_contact, //是否有联系方式
        is_jianlian, //是都建联
        assistSearch, //辅助搜索
        accurateCheckList, //精准匹配
        selectResidentArea, //常驻地址
        selectIpArea, //ip地址
        skinSensitive, //是否敏感肌
        skinColor, //肤色
        skinSpecialty, //皮肤特质
      } = this.searchForm;
      let obj = {};

      /* 修改提交领域数据  区分其他 */
      let newSelectedDomain = this.searchForm.selectedDomain.map((item) => {
        /* 这一步是因为这里是对象数组避免修改原数组  回显的时候需要做出额外拼接 */
        let obj = { ...item };
        if (obj.ppid && obj.ppid.length > 0) {
          obj.ppid = obj.ppid.map((item2) => {
            if (item2.includes("其他")) {
              item2 = "其他";
            }
            return item2;
          });
        }
        return obj;
      });
      if (accurateCheckList.length == 1) {
        obj.leimu = {
          level_1: accurateCheckList[0],
        };
      } else if (accurateCheckList.length == 2) {
        obj.leimu = {
          level_1: accurateCheckList[0],
          level_2: accurateCheckList[1],
        };
      } else if (accurateCheckList.length == 3) {
        obj.leimu = {
          level_1: accurateCheckList[0],
          level_2: accurateCheckList[1],
          level_3: accurateCheckList[2],
        };
      } else {
        obj.leimu = null;
      }
      console.log("obj.leimu: ", obj.leimu);
      console.log("accurateCheckList: ", accurateCheckList);
      obj.pageSize = this.pageSize;
      obj.page = this.currentPage;

      /* if (selectIpArea.length > 0) {
        obj.last_location = {
          level_1: selectIpArea[0],
          level_2: selectIpArea[1],
          level_3: selectIpArea[2],
        };
      } else {
        obj.last_location = null;
      }
      if (selectResidentArea.length > 0) {
        obj.location = {
          level_1: selectResidentArea[0],
          level_2: selectResidentArea[1],
          level_3: selectResidentArea[2],
        };
      } else {
        obj.location = null;
      } */
      obj.last_location = selectIpArea == "" ? null : selectIpArea;
      obj.location = selectResidentArea == "" ? null : selectResidentArea;
      /* interact = interact.filter((res) => {
        return res.field && res.min && res.max;
      });
      console.log('interact: ', interact); */
      obj.skin_color = skinColor == "null" ? null : skinColor;
      obj.skin_type = skinSpecialty == "null" ? null : skinSpecialty;
      obj.is_sensitive = skinSensitive == "null" ? null : skinSensitive;
      obj.type = selectedPlatform;
      obj.domain = newSelectedDomain;
      obj.persona = selectedAccount;
      obj.content_type = selectedContentForm;
      obj.fans_min = fanNUm1;
      obj.fans_max = fanNUm2;
      obj.data_type = interact;
      obj.price_type = offerData;
      obj.sex_m_min = man.num1;
      obj.sex_m_max = man.num2;
      obj.sex_w_min = woman.num1;
      obj.sex_w_max = woman.num2;
      obj.fans_age = agedistribute;
      obj.baby_info = [babyData];
      obj.is_contact = is_contact ? "1" : null;
      obj.is_jianlian = is_jianlian ? "1" : null;
      obj.keyword = assistSearch;
      console.log("obj: ", obj);
      return obj;
    },
    /* 搜索数据 */
    searchBtn(type) {
      if (type == 1) {
        try {
          dataPoint({ event_id: "K0100", times: 1 });
        } catch (error) {
          console.error(error);
        }
      }
      let obj = this.subFormatData();
      /* obj = {
        type: [2],
      }; */
      this.isLoading = true;
      searchData(obj)
        .then((res) => {
          if (res.code == 200) {
            let { data, current_page, total } = res.data;
            this.isLoading = false;
            this.currentPage = current_page;
            this.total = total;
            data.map((res) => {
              res.editContentFormShow = false;
              res.editAccountSetShow = false;
              res.editPopDomainShow = false;
              res.editBbppriceShow = false;
              res.editArticlePriceShow = false;
              res.editArticleCollectPriceShow = false;
              res.editBbvpriceShow = false;
              res.editVideoPriceShow = false;
              res.editVideoCollectPriceShow = false;
              res.editRebateShow = false;

              return res;
            });
            console.log("data: ", data);
            this.expertTable = data;
            console.log(this.tableData);
          } else {
            this.isLoading = false;
            console.error(res.msg);
          }
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    /* 清空数据 */
    resetData() {
      (this.currentPage = 1), //当前页数
        (this.pageSize = 10), //每页显示条数
        (this.total = 10), //总条数
        (this.domainAllSelect = []), //筛选领域回显
        (this.editDomainAllSelect = []), //修改领域
        (this.popShow = {
          showfanpop: false,
          showinteractpop: false,
          showofferpop: false,
          showagepop: false,
          showsexpop: false,
          showbabypop: false,
          showskinpop: false,
          showbloggerpop: false,
          showskinSensitive: false, //是否敏感肌
          showskinColor: false, //肤色
          showskinSpecialty: false,
        }),
        /* 表单修改领域提交的数据 */
        (this.editDomain = {
          selectedEditDomain: [], //领域
        }),
        /* 修改返点 */
        (this.editRebateInp = ""),
        /* 修改视频非报备合集报价 */
        (this.editVideoCollectPriceInp = ""),
        /* 修改视频非报备报价 */
        (this.editVideoPriceInp = ""),
        /* 修改视频报备报价 */
        (this.editBbvpriceInp = ""),
        /* 修改图文非报备报价合集  */
        (this.editArticleCollectPriceInp = ""),
        /* 修改图文非报备报价 */
        (this.editArticlePriceInp = ""),
        /* 修改图文报备报价 */
        (this.editBbppriceInp = ""),
        //表单修改账号人设的数据
        (this.editAccountSetting = []),
        //表单内容形式
        (this.editContentForm = []),
        (this.searchForm = {
          skinSensitive: "null", //是否敏感肌
          skinColor: "null", //肤色
          skinSpecialty: "null", //皮肤特质
          is_contact: false, //是否有联系方式
          is_jianlian: false, //是否建联
          accurateCheckList: [], //精准匹配
          assistSearch: null, //辅助搜索内容
          contact: null, //联系方式
          selectResidentArea: null, //选中常驻地址
          residentArea: [], //常驻地址代号
          selectIpArea: null, //选中的ip地址
          ipArea: [], //ip地址代号
          skinData: [], //皮肤数据
          selectedPlatform: [],
          selectedDomain: [], //领域
          selectedAccount: [], //账号人设
          selectedContentForm: [], //内容形式
          fanNUm1: null, //粉丝量最低
          fanNUm2: null, //粉丝量最高
          /* 互动数据 */
          interact: [
            {
              field: "",
              min: "",
              max: "",
            },
          ],
          /* 报价数据 */
          offerData: [
            {
              field: "",
              min: "",
              max: "",
            },
          ],
          /* 年龄数据 */
          agedistribute: [
            {
              field: "",
              min: "",
              max: "",
            },
          ],
          /* 性别占比男 */
          man: {
            num1: null,
            num2: null,
          },
          /* 性别占比女 */
          woman: {
            num1: null,
            num2: null,
          },
          /* 宝宝data */
          babyData: {
            field: "",
            min: "",
            max: "",
          },
        });
    },
    /* 
      //区域码转汉字
      let arr=[]
      arr.push(TextToCode['山西省'].code,TextToCode['山西省']['长治市'].code)
      console.log('arr: ', arr);
       */
    ipChange() {
      var loc = [];
      for (let i = 0; i < this.searchForm.ipArea.length; i++) {
        loc.push(CodeToText[this.searchForm.ipArea[i]]);
      }
      this.searchForm.selectIpArea = loc;
    },
    residentChange() {
      var loc = [];
      for (let i = 0; i < this.searchForm.residentArea.length; i++) {
        loc.push(CodeToText[this.searchForm.residentArea[i]]);
      }
      console.log(this.searchForm.residentArea);
      this.searchForm.selectResidentArea = loc;
    },
    searchList() {
      console.log("this.searchForm.skinData: ", this.searchForm.skinData);
    },
    addInteract(type) {
      /* type 1是互动数据 2是报价 */
      let obj = {
        field: "",
        min: "",
        max: "",
      };
      if (type == 1) {
        this.searchForm.interact.push(obj);
      } else if (type == 2) {
        this.searchForm.offerData.push(obj);
      } else if (type == 3) {
        this.searchForm.agedistribute.push(obj);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.tips {
  display: inline-block;
  font-size: 15px;
  line-height: 30px;
  padding-left: 20px;
  border: 1px solid #f7f7f7;
  font-weight: bold;
  .el-icon-warning-outline {
    margin-right: 5px;
  }
}
.interactpop_content {
  .add_item {
    width: 100%;
    height: 20px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .interactpop_content_item {
    display: flex;
    align-items: center;
    margin-top: 10px;
    &:nth-child(1) {
      margin-top: 0;
    }
    /deep/ .el-input {
      width: 100px;
      .el-input__inner {
        height: 20px;
      }
      .el-input__icon {
        line-height: 20px;
      }
    }
    .interactpop_item_inp {
      width: 100px;
    }
  }
}
.contact_wrap {
  display: flex;
  align-items: center;
  height: 30px;
  padding-left: 10px;
  .assist_search_inp {
    width: 200px;
    margin-right: 10px;
  }
}
.data_request {
  display: flex;
  color: #606266;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  margin-right: 30px;
  .data_item {
    margin-left: 10px;
    margin-right: 10px;
  }
}
.pop_content {
  .inp_wrap {
    display: flex;
    .flex_label {
      display: flex;
      align-items: center;
    }
    .inp_wrap_label {
      width: 20%;
    }
    .inp_wrap_inp {
      width: 100px;
    }
  }
  .inp_wrap_btn {
    margin-top: 10px;
    width: 100%;
    text-align: right;
    color: blue;
    cursor: pointer;
  }
}
/deep/ .el-form-item {
  margin-bottom: 10px;
  .el-form-item__label {
    line-height: 30px;
    font-weight: bold;
  }
  .el-form-item__content {
    line-height: 30px;
  }
}
/deep/ #vg-checkbox {
  .el-checkbox-group {
    margin-right: -10px;
    margin-bottom: -10px;
    overflow: hidden;

    .el-checkbox {
      position: relative;
      margin-right: 10px;
      margin-bottom: 10px;

      .el-checkbox__input {
        display: none;
      }
    }
  }
}
</style>
<style lang="scss">
#vg-checkbox2 {
  .el-checkbox-group {
    margin-right: -10px;
    margin-bottom: -10px;
    overflow: hidden;

    .el-checkbox {
      position: relative;
      margin-right: 10px;
      margin-bottom: 10px;

      .el-checkbox__input {
        display: none;
      }
    }
  }
}
.skin_pop_cascader {
  .el-cascader-menu:nth-child(1) {
    .el-checkbox {
      display: none !important;
    }
  }
}
</style>